"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Const_1 = __importDefault(require("./Const"));
const convert_excel_to_json_1 = __importDefault(require("convert-excel-to-json"));
const JsonHPack_1 = __importDefault(require("./JsonHPack"));
const path_1 = __importDefault(require("path"));
const pako_1 = __importDefault(require("../lib/pako/pako"));
/**
 * 工具类
 */
class Utility {
    /**
     * 递归获取目录下所有文件
     * @param dir 目录
     * @param filesList 文件列表
     * @returns 文件列表
     */
    static readFileList(dir, filesList = []) {
        const files = fs_1.default.readdirSync(dir);
        files.forEach((item, index) => {
            var fullPath = path_1.default.join(dir, item);
            const stat = fs_1.default.statSync(fullPath);
            if (stat.isDirectory()) {
                Utility.readFileList(path_1.default.join(dir, item), filesList); //递归读取文件
            }
            else {
                let extname = path_1.default.extname(fullPath);
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
    static checkDirectory(dir) {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        return dir;
    }
    /**
     * 保存
     * @param key 关键字
     * @param value 值
     */
    static save(key, value) {
        this.checkDirectory(Const_1.default.TEMP_PATH);
        this.checkDirectory(Const_1.default.TEMP_DATA_PATH);
        let data = {};
        if (fs_1.default.existsSync(Const_1.default.TEMP_DATA_FILE)) {
            let raw = fs_1.default.readFileSync(Const_1.default.TEMP_DATA_FILE, 'utf-8');
            data = JSON.parse(raw);
        }
        if (!data) {
            data = {};
        }
        data[key] = value;
        fs_1.default.writeFileSync(Const_1.default.TEMP_DATA_FILE, JSON.stringify(data));
    }
    /**
     * 读取
     * @param key 关键字
     * @returns
     */
    static load(key) {
        this.checkDirectory(Const_1.default.TEMP_PATH);
        this.checkDirectory(Const_1.default.TEMP_DATA_PATH);
        let data = {};
        if (fs_1.default.existsSync(Const_1.default.TEMP_DATA_FILE)) {
            let raw = fs_1.default.readFileSync(Const_1.default.TEMP_DATA_FILE, 'utf-8');
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
    static excelToData(excelPath, savePath, scriptPath) {
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
            console.error('脚本只能保存在CocosCreator工程的assets目录下');
            return;
        }
        if (scriptPath.includes(`assets${path_1.default.sep}FYFramework`)) {
            console.error('脚本不能保存在FYFramework框架目录下');
            return;
        }
        if (!fs_1.default.existsSync(savePath)) {
            console.error('保存路径不存在，请先创建好路径, savePath = ' + savePath);
            return;
        }
        if (!fs_1.default.existsSync(scriptPath)) {
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
        const result = (0, convert_excel_to_json_1.default)({
            sourceFile: excelPath,
            header: {
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });
        let excelFileName = '';
        let split1 = excelPath.split(path_1.default.sep);
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
                let jsonFileName = Const_1.default.JSON_NAME_PRE + configName + '.bin';
                let scriptFileName = scriptPath + path_1.default.sep + 'Cfg' + configName + '.ts';
                let substring = 'assets' + path_1.default.sep;
                const sepIndex = scriptFileName.indexOf(substring);
                // 从子字符串末尾开始统计
                let count = 0;
                console.log(sepIndex);
                for (let i = sepIndex + substring.length; i < scriptFileName.length; i++) {
                    if (scriptFileName[i] === path_1.default.sep) {
                        count++;
                    }
                }
                console.log(scriptFileName);
                console.log(count);
                let script = this.genConfigClass(configName, element, dictType, dictComment, count);
                fs_1.default.writeFileSync(scriptFileName, script);
                let strJson = JSON.stringify(element);
                this.originalConfigSize += strJson.length;
                let compress = pako_1.default.deflate(JSON.stringify(JsonHPack_1.default.hPack(element, 4)), { to: "string" });
                this.compressConfigSize += compress.length;
                fs_1.default.writeFileSync(savePath + path_1.default.sep + jsonFileName, compress);
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
    static genConfigClass(configName, configData, types, comments, sepIndex) {
        if (!fs_1.default.existsSync(Const_1.default.TEMPLATE_PATH)) {
            console.error('目录不存在:' + Const_1.default.TEMPLATE_PATH);
            return '';
        }
        if (!configData || configData.length <= 0) {
            console.error('配置数据异常');
            return '';
        }
        let template = fs_1.default.readFileSync(Const_1.default.TEMPLATE_PATH + '/' + Const_1.default.TEMPLATE_NAME, 'utf-8');
        let params = '';
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
        template = template.replace(new RegExp('\\' + Const_1.default.TEMPLATE_KEY_SLASHES, 'g'), slashes);
        template = template.replace(new RegExp('\\' + Const_1.default.TEMPLATE_KEY, 'g'), configName);
        template = template.replace(Const_1.default.TEMPLATE_KEY_PARAMS, params);
        return template;
    }
}
/** 原始配置大小 */
Utility.originalConfigSize = 0;
/** 压缩后配置大小 */
Utility.compressConfigSize = 0;
exports.default = Utility;
