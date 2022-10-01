import { Button, _decorator } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { UILoading } from '../UILoading/UILoading';
import { UIMenu } from '../UIMenu/UIMenu';
import { UILoadingDemoModel } from './UILoadingDemoModel';
import { UILoadingDemoView } from './UILoadingDemoView';
const { ccclass, property } = _decorator;


@ccclass('UILoadingDemo')
export class UILoadingDemo extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UILoadingDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UILoadingDemo';

    public model: UILoadingDemoModel = undefined;
    public view: UILoadingDemoView = undefined;

    addEvent() {
        this.on(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    removeEvent() {
        this.off(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.addEvent();
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.removeEvent();
    }

    /**
    * 
    * @param eventType 事件类型
    * @param component 触发事件的组件
    */
    private async onButtonClick(eventType: string, component: Button) {
        // FYLog.log(`点击了 ${component.name}`);
        switch (component.name) {
            case this.view.cShowUILoadingButton.name:
                let totalNum = Number(this.view.cTotalEditBox.string);
                let curNum = 0;
                let loading = (await (FY.ui.open(UILoading)));
                loading.setData(totalNum, () => {
                    FY.ui.close(UILoading);
                    this.unscheduleAllCallbacks();
                });
                this.schedule(() => {
                    curNum++;
                    loading.updateData(curNum);
                }, 1, totalNum);
                break;
            case this.view.cShowUIMenuButton.name:
                await FY.ui.open(UIMenu);
                this.close();
                break;
            default:
                break;
        }
    }
}