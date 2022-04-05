import AssistConst from "./AssistConst";
import fs from 'fs';
import Utility from "../Utility";

/** 辅助界面 */
export default class AssistPanel {
    private static labExcludeExtensions: any;
    private static btnExcludeExtensions: any;
    private static labAddDts: any;
    private static btnAddDts: any;

    private static strConfig: any;
    private static excludeIndex: any;
    private static excludeStartIndex: any;
    private static extensionsIndex: any;

    public static init(...params: any[]) {
        let btnExcludeExtensions: any = params[0];
        let labExcludeExtensions: any = params[1];
        let labAddDts: any = params[2]
        let btnAddDts: any = params[3];

        if (!btnExcludeExtensions || !labExcludeExtensions) {
            console.error('btnExcludeExtensions is null or labExcludeExtensions is null');
            return;
        }

        if (!labAddDts || !btnAddDts) {
            console.error('labAddDts is null or btnAddDts is null');
            return;
        }

        this.labExcludeExtensions = labExcludeExtensions;
        this.btnExcludeExtensions = btnExcludeExtensions;
        this.labAddDts = labAddDts;
        this.btnAddDts = btnAddDts;

        this.refreshUIExtension();

        // 在tsconfig.json中添加Cocos插件文件夹排除
        this.btnExcludeExtensions.addEventListener('confirm', () => {
            this.onBtnExcludeExtensions();
        });

        this.refrshUIType();
        this.btnAddDts.addEventListener('confirm', () => {
            this.onBtnAddDts();
        });
    }

    /**
     * 排除插件内脚本界面刷新
     */
    private static refreshUIExtension() {
        this.strConfig = fs.readFileSync(AssistConst.TSCONFIG_PATH, 'utf-8');
        this.excludeIndex = this.strConfig.indexOf('"exclude"');
        this.excludeStartIndex = this.strConfig.indexOf('[', this.excludeIndex);
        this.extensionsIndex = this.strConfig.indexOf('"extensions"', this.excludeStartIndex);

        if (this.excludeIndex >= 0 && this.excludeStartIndex >= 0 && this.extensionsIndex >= 0) {
            this.labExcludeExtensions.value = '已经排除了插件内的脚本，无需操作。';
            this.labExcludeExtensions.style = 'color:white;'
            this.btnExcludeExtensions.setAttribute('disabled', '');
        } else {
            this.labExcludeExtensions.value = '还没有排除插件内的脚本。';
            this.labExcludeExtensions.style = 'color:yellow;'
            this.btnExcludeExtensions.removeAttribute('disabled');
        }
    }

    private static refrshUIType() {
        let projTypeVersion = this.getProjTypeVersion();
        let extTypeVersion = this.getExtTypeVersion();
        
        if (projTypeVersion < extTypeVersion) {
            this.labAddDts.value = '添加类型定义文件.d.ts';
            this.btnAddDts.removeAttribute('disabled');
        }else{
            this.labAddDts.value = '已经添加类型定义文件，无需操作';
            this.btnAddDts.setAttribute('disabled', '');
        }
    }

    /**
     * 排除插件内脚本按钮回调
     * @returns 
     */
    private static onBtnExcludeExtensions() {
        if (!fs.existsSync(AssistConst.TSCONFIG_PATH)) {
            let config: any = {
                title: '找不到tsconfig.json',
                detail: '在工程根目录下找不到tsconfig.json，请检查一下。',
                buttons: ['确定'],
            };
            Editor.Dialog.info('找不到tsconfig.json', config);
            return;
        }
        let result = '';
        if (this.excludeIndex >= 0 && this.excludeStartIndex >= 0) {
            // 如果找到
            // 如果排除项里面没有extensions则添加
            if (this.extensionsIndex < 0) {
                result = this.strConfig.substring(0, this.excludeStartIndex + 1);
                result += '\n\t\t"extensions",'
                result = result + this.strConfig.substring(this.excludeStartIndex + 1);
            }
        } else {
            // 如果没找到 在末尾添加
            let endIndex = this.strConfig.lastIndexOf('}');
            result = this.strConfig.substring(0, endIndex);
            result += '\n\t,"exclude": [';
            result += '\n\t\t"extensions"';
            result += '\n\t]';
            result += '\n' + this.strConfig.substring(endIndex);
        }

        if (typeof result === 'string' && result.length > 0) {
            fs.writeFileSync(AssistConst.TSCONFIG_PATH, result);
            this.refreshUIExtension();
        }
    }

    /**
     * 添加类型定义文件按钮回调
     */
    private static onBtnAddDts() {
        let isProjTypeExist = fs.existsSync(AssistConst.PROJ_TYPE_PATH);
        let isExtTypeExist = fs.existsSync(AssistConst.EXT_TYPE_PATH);
        let projTypeVersion = this.getProjTypeVersion();
        let extTypeVersion = this.getExtTypeVersion();

        if (!isProjTypeExist || projTypeVersion < extTypeVersion) {
            // 如果项目类型定义文件不存在，或者项目类型定义文件版本号小于扩展类型定义文件版本号，则删除后拷贝
            if (isProjTypeExist) {
                // 如果存在，则删除
                fs.rmdirSync(AssistConst.PROJ_TYPE_PATH, { recursive: true });
            }
            Utility.copyFile(AssistConst.EXT_TYPE_PATH, AssistConst.PROJ_TYPE_PATH);
        }

        this.refrshUIType();
    }

    /**
     * 获取项目类型版本号
     * @returns 
     */
    private static getProjTypeVersion() {
        if (fs.existsSync(AssistConst.PROJ_TYPE_VERSION)) {
            let json = JSON.parse(fs.readFileSync(AssistConst.PROJ_TYPE_VERSION, 'utf-8'));
            if (json['version']) {
                return json['version'];
            }
            return -1;
        }
        return -1;
    }

    /**
     * 获取扩展类型版本号
     * @returns 
     */
    private static getExtTypeVersion() {
        if (fs.existsSync(AssistConst.EXT_TYPE_VERSION)) {
            let json = JSON.parse(fs.readFileSync(AssistConst.EXT_TYPE_VERSION, 'utf-8'));
            if (json['version']) {
                return json['version'];
            }
            return -1;
        }
        return -1;
    }
}