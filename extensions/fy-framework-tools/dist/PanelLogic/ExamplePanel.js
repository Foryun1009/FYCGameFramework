"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utility_1 = __importDefault(require("../Utility"));
const ExampleConst_1 = __importDefault(require("./ExampleConst"));
class ExamplePanel {
    static init(...params) {
        let btnInitExample = params[0];
        if (!btnInitExample) {
            console.error('btnInitExample is null');
            return;
        }
        this.btnInitExample = btnInitExample;
        this.btnInitExample.addEventListener('confirm', () => {
            this.onBtnInitExample();
        });
    }
    static async onBtnInitExample() {
        let config = {
            title: '确定要拷贝样本项目吗？',
            detail: '拷贝之前，请做好备份，以免出现意外!!!',
            buttons: ['取消', '确定'],
        };
        let code = await Editor.Dialog.info('确定要拷贝样本项目吗？', config);
        if (code.response === 1) {
            // 点击确定
            Utility_1.default.copyFile(ExampleConst_1.default.EXT_EXAMPLE_PATH, ExampleConst_1.default.PROJECT_ASSET_PATH);
            // 编辑器刷新 将新创建的资源导入
            Editor.Message.request('asset-db', 'refresh-asset', `db://assets`);
        }
    }
}
exports.default = ExamplePanel;
