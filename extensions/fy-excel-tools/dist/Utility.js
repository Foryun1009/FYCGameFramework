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
        if (!fs_1.default.existsSync(savePath)) {
            console.error('保存路径不存在，请先创建好路径, savePath = ' + savePath);
            return;
        }
        if (!fs_1.default.existsSync(scriptPath)) {
            console.error('脚本路径不存在，请先创建好路径, scriptPath = ' + scriptPath);
            return;
        }
        const result = convert_excel_to_json_1.default({
            sourceFile: excelPath,
            header: {
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });
        let excelFileName = '';
        let split1 = excelPath.split('/');
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
                let jsonFileName = Const_1.default.JSON_NAME_PRE + excelFileName + '.bin';
                if (keyNum > 1) {
                    // 如果表单数不只一个
                    jsonFileName = Const_1.default.JSON_NAME_PRE + excelFileName + '_' + key + '.bin';
                }
                let script = this.genConfigClass(excelFileName, element);
                fs_1.default.writeFileSync(scriptPath + '/Cfg' + excelFileName + '.ts', script);
                let strJson = JSON.stringify(element);
                this.originalConfigSize += strJson.length;
                let compress = pako_1.default.deflate(JSON.stringify(JsonHPack_1.default.hPack(element, 4)), { to: "string" });
                this.compressConfigSize += compress.length;
                fs_1.default.writeFileSync(savePath + '/' + jsonFileName, compress);
            }
        }
    }
    /**
     * 生成视图类
     * @param configName 配置名
     * @param configData 配置数据
     * @returns
     */
    static genConfigClass(configName, configData) {
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
        for (let key in configData[0]) {
            let valueType = '';
            if (typeof configData[0][key] === 'number') {
                valueType = 'number';
            }
            else {
                valueType = 'string';
            }
            params += `\t${key}: ${valueType};\n`;
        }
        template = template.replace(new RegExp('\\' + Const_1.default.TEMPLATE_KEY, 'g'), configName);
        template = template.replace(Const_1.default.TEMPLATE_KEY_PARAMS, params);
        return template;
    }
}
exports.default = Utility;
/** 原始配置大小 */
Utility.originalConfigSize = 0;
/** 压缩后配置大小 */
Utility.compressConfigSize = 0;
