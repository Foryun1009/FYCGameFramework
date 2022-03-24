import Utility from "../Utility";
import fs from 'fs';
import InitFrameConst from "./InitFrameConst";

/** 初始化框架界面 */
export default class InitFramePanel {
    private static labInitTip: any;
    private static btnInit: any;
    private static verExtensions: any;
    private static verProject: any;

    public static init(...params: any[]) {
        let labInitTip: any = params[0];
        let btnInit: any = params[1];
        let verExtensions: any = params[2];
        let verProject: any = params[3];

        if (!labInitTip || !btnInit || !verExtensions || !verProject) {
            console.error('labInitTip is null or btnInit is null or verExtensions is null or verProject is null');
            return;
        }

        this.labInitTip = labInitTip;
        this.btnInit = btnInit;
        this.verExtensions = verExtensions;
        this.verProject = verProject;

        let version = this.getFrameworkVersion();
        let extensionsVersion = this.getFrameworkExtensionsVersion();

        if (!fs.existsSync(InitFrameConst.FY_FRAMEWORK_EXTENSIONS_PATH)) {
            console.error('插件找不到框架目录，请更新插件');
            labInitTip.value = '插件找不到框架目录，请更新插件';
            labInitTip.style = 'color:red;'
            return;
        }

        Editor.Message.addBroadcastListener('asset-db:asset-change', () => {
            this.refreshUI();
        });

        this.refreshUI();
        btnInit.addEventListener('confirm', async () => {
            if (version === -1) {
                this.copyFramework();
                this.refreshUI();
            } else {
                let config: any = {
                    title: '确定要更新框架吗？',
                    detail: '更新框架之前，请做好备份，以免出现意外!!!',
                    buttons: ['取消', '确定'],
                };
                let code = await Editor.Dialog.info('确定要更新框架吗？', config);
                if (code.response === 1) {
                    // 点击确定
                    this.copyFramework();
                    this.refreshUI();
                }
            }
        });
    }

    private static refreshUI() {
        let version = this.getFrameworkVersion();
        let extensionsVersion = this.getFrameworkExtensionsVersion();

        if (version === -1) {
            // 框架没有初始化，或者框架初始化有问题
            this.labInitTip.value = '框架还没初始化';
            this.labInitTip.style = 'color:yellow;'

            this.btnInit.innerHTML = '初始化';
            this.btnInit.removeAttribute('disabled');
        } else {
            if (version === extensionsVersion) {
                // 有框架，提示用户是否要替换
                this.verExtensions.value = extensionsVersion;
                this.verProject.value = version;
                this.labInitTip.value = `无需更新`;
                this.labInitTip.style = 'color:white;'

                this.btnInit.innerHTML = '更新框架';
                this.btnInit.setAttribute('disabled', '');
            } else {
                // 有框架，提示用户是否要替换
                this.verExtensions.value = extensionsVersion;
                this.verProject.value = version;
                this.labInitTip.value = `是否要更新框架?`;
                this.labInitTip.style = 'color:white;'

                this.btnInit.innerHTML = '更新框架';
                this.btnInit.removeAttribute('disabled');
            }

        }
    }

    /** 获取框架版本号 */
    private static getFrameworkVersion() {
        if (fs.existsSync(InitFrameConst.FY_FRAMEWORK_VERSION_PATH)) {
            let json = JSON.parse(fs.readFileSync(InitFrameConst.FY_FRAMEWORK_VERSION_PATH, 'utf-8'));
            if (json['version']) {
                return json['version'];
            }
            return -1;
        }
        return -1;
    }

    /** 获取插件中的框架版本号 */
    private static getFrameworkExtensionsVersion() {
        if (fs.existsSync(InitFrameConst.FY_FRAMEWORK_EXTENSIONS_VERSION_PATH)) {
            let json = JSON.parse(fs.readFileSync(InitFrameConst.FY_FRAMEWORK_EXTENSIONS_VERSION_PATH, 'utf-8'));
            if (json['version']) {
                return json['version'];
            }
            return -1;
        }
        return -1;
    }

    /** 拷贝框架 */
    private static copyFramework() {
        if (fs.existsSync(InitFrameConst.FY_FRAMEWORK_PATH)) {
            // 如果存在，则删除
            fs.rmdirSync(InitFrameConst.FY_FRAMEWORK_PATH, { recursive: true });
        }
        Utility.copyFile(InitFrameConst.FY_FRAMEWORK_EXTENSIONS_PATH, InitFrameConst.FY_FRAMEWORK_PATH);

        // 编辑器刷新 将新创建的资源导入
        Editor.Message.request('asset-db', 'refresh-asset', `db://assets/FYFramework`);
    }
}