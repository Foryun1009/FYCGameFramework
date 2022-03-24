import Utility from "../Utility";
import ExampleConst from "./ExampleConst";


export default class ExamplePanel {
    private static btnInitExample: any;

    public static init(...params: any[]) {
        let btnInitExample: any = params[0];

        if (!btnInitExample) {
            console.error('btnInitExample is null');
            return;
        }

        this.btnInitExample = btnInitExample;

        this.btnInitExample.addEventListener('confirm', () => {
            this.onBtnInitExample();
        });
    }

    private static async onBtnInitExample() {
        let config: any = {
            title: '确定要拷贝样本项目吗？',
            detail: '拷贝之前，请做好备份，以免出现意外!!!',
            buttons: ['取消', '确定'],
        };
        let code = await Editor.Dialog.info('确定要拷贝样本项目吗？', config);
        if (code.response === 1) {
            // 点击确定
            Utility.copyFile(ExampleConst.EXT_EXAMPLE_PATH, ExampleConst.PROJECT_ASSET_PATH);
            // 编辑器刷新 将新创建的资源导入
            Editor.Message.request('asset-db', 'refresh-asset', `db://assets`);
        }
    }
}