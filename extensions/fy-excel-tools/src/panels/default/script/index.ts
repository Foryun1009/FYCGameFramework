import { readFileSync } from 'fs-extra';
import { join } from 'path';
import Utility from '../../../Utility';
import Const from '../../../Const';

module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../../static/template/default/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../../static/style/default/index.css'), 'utf-8'),
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
            let fileConfigPath: any = this.$.fileConfigPath;
            let fileDataPath: any = this.$.fileDataPath;
            let fileScriptPath: any = this.$.fileScriptPath;
            let progressGen: any = this.$.progress;

            Utility.save(Const.KEY_CONFIG_PATH, fileConfigPath.value);
            Utility.save(Const.KEY_DATA_PATH, fileDataPath.value);
            Utility.save(Const.KEY_SCRIPT_PATH, fileScriptPath.value);

            let len = 0;
            let count = 0;

            let files = Utility.readFileList(fileConfigPath.value, []);
            len = files.length;

            Utility.compressConfigSize = 0;
            Utility.originalConfigSize = 0;

            for (let i = 0; i < files.length; i++) {
                let filePath = files[i];
                let progress = 0;
                if (len > 0) {
                    progress = count / len * 100;
                }
                progressGen.value = progress;
                progressGen.message = '构建配置中 - ' + filePath;
                console.log(`构建进度 ${progress.toFixed(2)}% - 构建日志：${filePath}`);

                Utility.excelToData(filePath, fileDataPath.value, fileScriptPath.value);
                // 让界面有时间刷新
                await new Promise(f => setTimeout(f, 1));
                count++;
            }

            if (len === count) {
                progressGen.value = 100;
                progressGen.message = `构建配置完成，压缩后/压缩前=${(Utility.compressConfigSize / Utility.originalConfigSize * 100).toFixed(2)}%`;
                console.log(`构建完成，压缩后/压缩前=${(Utility.compressConfigSize / Utility.originalConfigSize * 100).toFixed(2)}%`);
            }

            // 编辑器刷新 将新创建的资源导入
            Editor.Message.request('asset-db', 'refresh-asset', `db://assets`);
        }
    },
    ready() {
        if (this.$.fileConfigPath) {
            let fileConfigPath: any = this.$.fileConfigPath;
            fileConfigPath.value = Utility.load(Const.KEY_CONFIG_PATH);
            fileConfigPath.addEventListener('confirm', (event: any) => {
                if (event.target) {
                    fileConfigPath.value = event.target.value;
                }
            });
        }

        if (this.$.fileDataPath) {
            let fileDataPath: any = this.$.fileDataPath;
            fileDataPath.value = Utility.load(Const.KEY_DATA_PATH);
            fileDataPath.addEventListener('confirm', (event: any) => {
                if (event.target) {
                    fileDataPath.value = event.target.value;
                }
            });
        }

        if (this.$.fileScriptPath){
            let fileScriptPath: any = this.$.fileScriptPath;
            fileScriptPath.value = Utility.load(Const.KEY_SCRIPT_PATH);
            fileScriptPath.addEventListener('confirm', (event: any) => {
                if (event.target) {
                    fileScriptPath.value = event.target.value;
                }
            });
        }

        if (this.$.btnGenJson) {
            let btnGenJson: any = this.$.btnGenJson;
            btnGenJson.addEventListener('confirm', () => {
                this.genData();
            });
        }

        if (this.$.progress) {
            let progress: any = this.$.progress;
            progress.value = 0;
            progress.message = '';
        }
    },
    beforeClose() { },
    close() { },
});

