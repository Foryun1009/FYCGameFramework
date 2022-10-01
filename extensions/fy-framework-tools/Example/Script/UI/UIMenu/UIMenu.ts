import { Button, _decorator } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { GEnum } from '../../Define/GEnum';
import { UIJoystickDemo } from '../UIJoystickDemo/UIJoystickDemo';
import { UILoadingDemo } from '../UILoadingDemo/UILoadingDemo';
import { UIMessageBox } from '../UIMessageBox/UIMessageBox';
import { UITips } from '../UITips/UITips';
import { UIMenuModel } from './UIMenuModel';
import { UIMenuView } from './UIMenuView';
const { ccclass, property } = _decorator;


@ccclass('UIMenu')
export class UIMenu extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIMenu';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIMenu';

    public model: UIMenuModel = undefined;
    public view: UIMenuView = undefined;

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.on(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.off(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    private async onButtonClick(eventType: string, component: Button) {
        switch (component.name) {
            case this.view.cShowUITipsButton.name:
                (await FY.ui.open(UITips)).setData("测试提示框！！！");
                break;
            case this.view.cShowUIMessageBoxButton.name:
                (await FY.ui.open(UIMessageBox)).setData({
                    "type": GEnum.MessageBoxType.ButtonTwo, "content": "测试数据内容", "title": "测试数据标题", "yesButtonCb": async () => {
                        (await FY.ui.open(UITips)).setData("点击确认按钮");
                    }, "noButtonCb": async () => {
                        (await FY.ui.open(UITips)).setData("点击取消按钮");
                    }
                });
                break;
            case this.view.cShowUILoadingDemoButton.name:
                await FY.ui.open(UILoadingDemo);
                this.close();
                break;
            case this.view.cShowUIJoystickDemoButton.name:
                await FY.ui.open(UIJoystickDemo);
                this.close();
                break;
            default:
                break;
        }
    }
}