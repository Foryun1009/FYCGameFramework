"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const Utility_1 = __importDefault(require("../../../Utility"));
const Const_1 = __importDefault(require("../../../Const"));
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: fs_extra_1.readFileSync(path_1.join(__dirname, '../../../../static/template/default/index.html'), 'utf-8'),
    style: fs_extra_1.readFileSync(path_1.join(__dirname, '../../../../static/style/default/index.css'), 'utf-8'),
    $: {
        fileConfigPath: '#fileConfigPath',
        fileDataPath: '#fileDataPath',
        fileScriptPath: '#fileScriptPath',
        btnGenJson: '#btnGenJson',
        progress: '#progress'
    },
    methods: {
        /** 构建数据 */
        async genData() {
            let fileConfigPath = this.$.fileConfigPath;
            let fileDataPath = this.$.fileDataPath;
            let fileScriptPath = this.$.fileScriptPath;
            let progressGen = this.$.progress;
            Utility_1.default.save(Const_1.default.KEY_CONFIG_PATH, fileConfigPath.value);
            Utility_1.default.save(Const_1.default.KEY_DATA_PATH, fileDataPath.value);
            Utility_1.default.save(Const_1.default.KEY_SCRIPT_PATH, fileScriptPath.value);
            let len = 0;
            let count = 0;
            let files = Utility_1.default.readFileList(fileConfigPath.value, []);
            len = files.length;
            Utility_1.default.compressConfigSize = 0;
            Utility_1.default.originalConfigSize = 0;
            for (let i = 0; i < files.length; i++) {
                let filePath = files[i];
                let progress = 0;
                if (len > 0) {
                    progress = count / len * 100;
                }
                progressGen.value = progress;
                progressGen.message = '构建配置中 - ' + filePath;
                console.log(`构建进度 ${progress.toFixed(2)}% - 构建日志：${filePath}`);
                Utility_1.default.excelToData(filePath, fileDataPath.value, fileScriptPath.value);
                // 让界面有时间刷新
                await new Promise(f => setTimeout(f, 1));
                count++;
            }
            if (len === count) {
                progressGen.value = 100;
                progressGen.message = `构建配置完成，压缩后/压缩前=${(Utility_1.default.compressConfigSize / Utility_1.default.originalConfigSize * 100).toFixed(2)}%`;
                console.log(`构建完成，压缩后/压缩前=${(Utility_1.default.compressConfigSize / Utility_1.default.originalConfigSize * 100).toFixed(2)}%`);
            }
            // 编辑器刷新 将新创建的资源导入
            Editor.Message.request('asset-db', 'refresh-asset', `db://assets`);
        }
    },
    ready() {
        if (this.$.fileConfigPath) {
            let fileConfigPath = this.$.fileConfigPath;
            fileConfigPath.value = Utility_1.default.load(Const_1.default.KEY_CONFIG_PATH);
            fileConfigPath.addEventListener('confirm', (event) => {
                if (event.target) {
                    fileConfigPath.value = event.target.value;
                }
            });
        }
        if (this.$.fileDataPath) {
            let fileDataPath = this.$.fileDataPath;
            fileDataPath.value = Utility_1.default.load(Const_1.default.KEY_DATA_PATH);
            fileDataPath.addEventListener('confirm', (event) => {
                if (event.target) {
                    fileDataPath.value = event.target.value;
                }
            });
        }
        if (this.$.fileScriptPath) {
            let fileScriptPath = this.$.fileScriptPath;
            fileScriptPath.value = Utility_1.default.load(Const_1.default.KEY_SCRIPT_PATH);
            fileScriptPath.addEventListener('confirm', (event) => {
                if (event.target) {
                    fileScriptPath.value = event.target.value;
                }
            });
        }
        if (this.$.btnGenJson) {
            let btnGenJson = this.$.btnGenJson;
            btnGenJson.addEventListener('confirm', () => {
                this.genData();
            });
        }
        if (this.$.progress) {
            let progress = this.$.progress;
            progress.value = 0;
            progress.message = '';
        }
    },
    beforeClose() { },
    close() { },
});
