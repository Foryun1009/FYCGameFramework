import { Button, SpriteFrame, _decorator } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { UIMenu } from '../UIMenu/UIMenu';
import { UIResourceDemoModel } from './UIResourceDemoModel';
import { UIResourceDemoView } from './UIResourceDemoView';
const { ccclass, property } = _decorator;


@ccclass('UIResourceDemo')
export class UIResourceDemo extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIResourceDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIResourceDemo';

    public model: UIResourceDemoModel = undefined;
    public view: UIResourceDemoView = undefined;

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
            case this.view.cShowUIMenuButton.name:
                await FY.ui.open(UIMenu);
                this.close();
                break;
            case this.view.cLoadSprite1Button.name:
                this.view.cIconSprite.spriteFrame = await FY.resource.load<SpriteFrame>('T_Icon_Shake_Off', FYEnum.ResourceCacheType.AutoRelease, 'spriteFrame');
                break;
            case this.view.cLoadSprite2Button.name:
                this.view.cIconSprite.spriteFrame = await FY.resource.load<SpriteFrame>('T_Icon_Shake_On', FYEnum.ResourceCacheType.AutoRelease, 'spriteFrame');
                break;
            default:
                break;
        }
    }
}