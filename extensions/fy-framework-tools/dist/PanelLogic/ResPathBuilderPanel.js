"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Const_1 = __importDefault(require("../Const"));
const Utility_1 = __importDefault(require("../Utility"));
const fs_1 = __importDefault(require("fs"));
const pako_1 = __importDefault(require("../../lib/pako/pako"));
const ResPathBuilderConst_1 = __importDefault(require("./ResPathBuilderConst"));
class ResPathBuilderPanel {
    static init(...params) {
        let btnGenResPath = params[0];
        let pgGenResPath = params[1];
        let btnLoadResPath = params[2];
        if (!btnGenResPath && !pgGenResPath && !btnLoadResPath) {
            console.error('btnGenResPath is null or pgGenResPath is null or btnLoadResPath is null');
            return;
        }
        pgGenResPath.message = '未开始构建';
        if (!fs_1.default.existsSync(Const_1.default.ROOT_RES_PATH)) {
            pgGenResPath.message = '没有找到resources目录';
            return;
        }
        btnGenResPath.addEventListener('confirm', () => {
            this.genResPath(btnGenResPath, pgGenResPath, btnLoadResPath);
        });
        btnLoadResPath.addEventListener('confirm', () => {
            this.loadResPath(btnGenResPath, pgGenResPath, btnLoadResPath);
        });
    }
    static async genResPath(...params) {
        let btnGenResPath = params[0];
        let pgGenResPath = params[1];
        let btnLoadResPath = params[2];
        if (!btnGenResPath && !pgGenResPath && !btnLoadResPath) {
            console.error('btnGenResPath is null or pgGenResPath is null or btnLoadResPath is null');
            return;
        }
        pgGenResPath.message = '构建中';
        pgGenResPath.value = 1;
        btnGenResPath.setAttribute('disabled', '');
        btnLoadResPath.setAttribute('disabled', '');
        // 文件字典 key 文件名不含扩展名 value 文件在resources下的路径
        let fileDict = {};
        let fileNames = Utility_1.default.readFileList(Const_1.default.ROOT_RES_PATH, []);
        for (let i = 0; i < fileNames.length; i++) {
            let element = fileNames[i];
            let splits = element.split('/');
            let fileName = splits[splits.length - 1];
            // 没有扩展名的文件名
            let fileNameNoExt = fileName.split('.')[0];
            let prefix = Editor.Project.path + "/assets/resources/";
            // resources加载不能带后缀名
            let fileResPath = element.replace(prefix, "").split('.')[0];
            if (fileDict[fileNameNoExt] != null) {
                console.error(`资源名重复了，重复的资源：assets/resources/${fileResPath}`);
                return;
            }
            fileDict[fileNameNoExt] = fileResPath;
        }
        let json = JSON.stringify(fileDict);
        let compress = pako_1.default.deflate(json);
        // 校验目录，如果没有则创建
        Utility_1.default.checkDirectory(Const_1.default.ROOT_RES_PATH);
        let configPath = Const_1.default.ROOT_RES_PATH + '/' + ResPathBuilderConst_1.default.RES_PATH_CONFIG_NAME;
        // 让界面有时间刷新
        await new Promise(f => setTimeout(f, 1));
        // 写入文件
        fs_1.default.writeFileSync(configPath, compress);
        // 编辑器刷新 将新创建的资源导入
        Editor.Message.request('asset-db', 'refresh-asset', 'db://assets/resources/' + ResPathBuilderConst_1.default.RES_PATH_CONFIG_NAME);
        pgGenResPath.message = '构建完成';
        pgGenResPath.value = 100;
        btnGenResPath.removeAttribute('disabled');
        btnLoadResPath.removeAttribute('disabled');
        console.log(`资源路径生成成功，文件：${configPath}`);
    }
    static async loadResPath(...params) {
        let btnGenResPath = params[0];
        let pgGenResPath = params[1];
        let btnLoadResPath = params[2];
        if (!btnGenResPath && !pgGenResPath && !btnLoadResPath) {
            console.error('btnGenResPath is null or pgGenResPath is null or btnLoadResPath is null');
            return;
        }
        let configPath = Const_1.default.ROOT_RES_PATH + '/' + ResPathBuilderConst_1.default.RES_PATH_CONFIG_NAME;
        if (!fs_1.default.existsSync(configPath)) {
            let config = {
                title: '错误',
                detail: '资源路径配置文件不存在!',
                buttons: ['确定'],
            };
            Editor.Dialog.error('资源路径配置文件不存在!', config);
            console.error('资源路径配置文件不存在!');
            return;
        }
        pgGenResPath.message = '解析中';
        pgGenResPath.value = 1;
        btnGenResPath.setAttribute('disabled', '');
        btnLoadResPath.setAttribute('disabled', '');
        // 让界面有时间刷新
        await new Promise(f => setTimeout(f, 1));
        let data = fs_1.default.readFileSync(configPath);
        let json = JSON.parse(pako_1.default.inflate(data, { to: 'string' }));
        pgGenResPath.message = '解析完成，看日志';
        pgGenResPath.value = 100;
        btnGenResPath.removeAttribute('disabled');
        btnLoadResPath.removeAttribute('disabled');
        console.log(json);
    }
}
exports.default = ResPathBuilderPanel;
