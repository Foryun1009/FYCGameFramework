import fs from 'fs';
import Const from './Const';
import excelToJson from 'convert-excel-to-json';
import JsonHPack from './JsonHPack';
import path from 'path';
import Pako from '../lib/pako/pako';

/**
 * 工具类
 */
export default class Utility {
    /** 原始配置大小 */
    public static originalConfigSize = 0;
    /** 压缩后配置大小 */
    public static compressConfigSize = 0;
    /**
     * 递归获取目录下所有文件
     * @param dir 目录
     * @param filesList 文件列表
     * @returns 文件列表
     */
    public static readFileList(dir: string, filesList: Array<string> = []): Array<string> {
        const files = fs.readdirSync(dir);
        files.forEach((item, index) => {
            var fullPath: string = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                Utility.readFileList(path.join(dir, item), filesList);  //递归读取文件
            } else {
                let extname = path.extname(fullPath);
                if ((extname === '.xls' || extname === '.xlsx') && !item.startsWith('.') && !item.startsWith('_') && !item.startsWith('~$')) {
                    // 排除文件
                    filesList.push(fullPath);
                }
            }
        });
        return filesList;
    }

    /**
    * 校验目录，如果不存在，则创建
    * @param dir 目录
    * @returns 目录
    */
    public static checkDirectory(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }

    /**
     * 保存
     * @param key 关键字
     * @param value 值
     */
    public static save(key: string, value: string) {
        this.checkDirectory(Const.TEMP_PATH);
        this.checkDirectory(Const.TEMP_DATA_PATH);

        let data: { [key: string]: string } = {};
        if (fs.existsSync(Const.TEMP_DATA_FILE)) {
            let raw = fs.readFileSync(Const.TEMP_DATA_FILE, 'utf-8');
            data = JSON.parse(raw);
        }

        if (!data) {
            data = {};
        }

        data[key] = value;
        fs.writeFileSync(Const.TEMP_DATA_FILE, JSON.stringify(data));
    }

    /**
     * 读取
     * @param key 关键字
     * @returns 
     */
    public static load(key: string): string {
        this.checkDirectory(Const.TEMP_PATH);
        this.checkDirectory(Const.TEMP_DATA_PATH);

        let data: { [key: string]: string } = {};
        if (fs.existsSync(Const.TEMP_DATA_FILE)) {
            let raw = fs.readFileSync(Const.TEMP_DATA_FILE, 'utf-8');
            data = JSON.parse(raw);
        }

        return data[key] || '';
    }

    /**
     * excel转换成数据
     * @param excelPath excel文件路径
     * @param savePath 保存路径
     * @param scriptPath 脚本路径
     * @returns 
     */
    public static excelToData(excelPath: string, savePath: string, scriptPath: string) {
        if (typeof excelPath != 'string' || excelPath.length <= 0) {
            console.error('配置表路径错误, excelPath = ' + excelPath);
            return;
        }

        if (typeof savePath != 'string' || savePath.length <= 0) {
            console.error('保存路径错误, savePath = ' + savePath);
            return;
        }

        if (typeof scriptPath != 'string' || scriptPath.length <= 0) {
            console.error('脚本路径错误, scriptPath = ' + scriptPath);
            return;
        }

        if (!scriptPath.includes('assets')) {
            console.error('脚本只能保存在CocosCreator工程的assets目录下')
            return;
        }

        if (scriptPath.includes(`assets${path.sep}FYFramework`)) {
            console.error('脚本不能保存在FYFramework框架目录下');
            return;
        }

        if (!fs.existsSync(savePath)) {
            console.error('保存路径不存在，请先创建好路径, savePath = ' + savePath);
            return;
        }

        if (!fs.existsSync(scriptPath)) {
            console.error('脚本路径不存在，请先创建好路径, scriptPath = ' + scriptPath);
            return;
        }

        // result的结构
        // {
        //  Sheet1: [
        //              { ID: 'number', Name: 'string', Desc: 'string' },
        //              { ID: '编号', Name: '名字', Desc: '描述' },
        //              { ID: 1, Name: 'Apple', Desc: '苹果' },
        //              { ID: 2, Name: 'Banana', Desc: '香蕉' }
        //          ]
        // }
        const result = excelToJson({
            sourceFile: excelPath,
            header: {
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });
        let excelFileName = '';

        let split1 = excelPath.split(path.sep)
        if (split1.length > 0) {
            let split2 = split1.reverse()[0].split('.');
            if (split2.length > 0) {
                excelFileName = split2[0];
            }
        }

        if (typeof excelFileName != 'string' || excelFileName.length <= 0) {
            console.error('配置表文件名错误');
            return;
        }

        let keyNum = 0;
        for (const key in result) {
            if (Object.prototype.hasOwnProperty.call(result, key)) {
                const element = result[key];
                const dictType = element.shift();
                const dictComment = element.shift();

                keyNum++;
                let configName = excelFileName;
                if (keyNum > 1) {
                    // 如果表单数不只一个
                    configName = excelFileName + '_' + key;
                }

                let jsonFileName = Const.JSON_NAME_PRE + configName + '.bin';
                let scriptFileName = scriptPath + path.sep + 'Cfg' + configName + '.ts';

                let substring = 'assets' + path.sep;
                const sepIndex = scriptFileName.indexOf(substring);
                // 从子字符串末尾开始统计
                let count = 0;
                console.log(sepIndex)
                for (let i = sepIndex + substring.length; i < scriptFileName.length; i++) {
                    if (scriptFileName[i] === path.sep) {
                        count++;
                    }
                }
                console.log(scriptFileName)
                console.log(count)

                let script = this.genConfigClass(configName, element, dictType, dictComment, count);
                fs.writeFileSync(scriptFileName, script);

                let strJson = JSON.stringify(element);
                this.originalConfigSize += strJson.length;

                let compress = Pako.deflate(JSON.stringify(JsonHPack.hPack(element, 4)), { to: "string" });
                this.compressConfigSize += compress.length;

                fs.writeFileSync(savePath + path.sep + jsonFileName, compress);
            }
        }
    }

    /**
     * 生成视图类
     * @param configName 配置名
     * @param configData 配置数据
     * @param types 类型
     * @param comments 注释
     * @param sepIndex 分隔符个数
     * @returns 
     */
    public static genConfigClass(configName: string, configData: Array<{ [key: string]: any }>, types: { [key: string]: string }, comments: { [key: string]: string }, sepIndex: number): string {
        if (!fs.existsSync(Const.TEMPLATE_PATH)) {
            console.error('目录不存在:' + Const.TEMPLATE_PATH);
            return '';
        }

        if (!configData || configData.length <= 0) {
            console.error('配置数据异常');
            return '';
        }

        let template = fs.readFileSync(Const.TEMPLATE_PATH + '/' + Const.TEMPLATE_NAME, 'utf-8');

        let params = ''
        for (let key in types) {
            let valueType = types[key];
            // 将字符串拆分为多行数组
            const lines = comments[key].split('\n');
            // 为每行添加注释标记并拼接成新的字符串
            const commentLines = lines.map(line => `\t * ${line}`);
            // 将新的字符串数组组合成最终的多行注释格式
            const result = `\t/**\n${commentLines.join('\n')}\n\t */\n`;
            params += result;
            params += `\t${key}: ${valueType};\n`;
        }

        let slashes = '';
        for (let i = 0; i < sepIndex; i++) {
            slashes += '../';
        }

        template = template.replace(new RegExp('\\' + Const.TEMPLATE_KEY_SLASHES, 'g'), slashes);
        template = template.replace(new RegExp('\\' + Const.TEMPLATE_KEY, 'g'), configName);
        template = template.replace(Const.TEMPLATE_KEY_PARAMS, params);

        return template;
    }
}