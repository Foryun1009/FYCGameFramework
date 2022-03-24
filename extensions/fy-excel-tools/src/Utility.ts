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
                if (extname === '.xls' || extname === '.xlsx') {
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

        if (!fs.existsSync(savePath)) {
            console.error('保存路径不存在，请先创建好路径, savePath = ' + savePath);
            return;
        }

        if (!fs.existsSync(scriptPath)) {
            console.error('脚本路径不存在，请先创建好路径, scriptPath = ' + scriptPath);
            return;
        }

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
        let split1 = excelPath.split('/')
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

                keyNum++;
                let jsonFileName = Const.JSON_NAME_PRE + excelFileName + '.bin';
                if (keyNum > 1) {
                    // 如果表单数不只一个
                    jsonFileName = Const.JSON_NAME_PRE + excelFileName + '_' + key + '.bin'
                }

                let script = this.genConfigClass(excelFileName, element);
                fs.writeFileSync(scriptPath + '/Cfg' + excelFileName + '.ts', script);

                let strJson = JSON.stringify(element);
                this.originalConfigSize += strJson.length;

                let compress = Pako.deflate(JSON.stringify(JsonHPack.hPack(element, 4)), { to: "string" });
                this.compressConfigSize += compress.length;

                fs.writeFileSync(savePath + '/' + jsonFileName, compress);
            }
        }
    }

    /**
     * 生成视图类
     * @param configName 配置名
     * @param configData 配置数据
     * @returns 
     */
    public static genConfigClass(configName: string, configData: Array<{ [key: string]: any }>): string {
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
        for (let key in configData[0]) {
            let valueType = '';
            if (typeof configData[0][key] === 'number') {
                valueType = 'number';
            } else {
                valueType = 'string';
            }
            params += `\t${key}: ${valueType};\n`;
        }

        template = template.replace(new RegExp('\\' + Const.TEMPLATE_KEY, 'g'), configName);
        template = template.replace(Const.TEMPLATE_KEY_PARAMS, params);

        return template;
    }
}