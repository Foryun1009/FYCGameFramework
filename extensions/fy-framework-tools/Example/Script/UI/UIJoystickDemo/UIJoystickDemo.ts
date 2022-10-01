import { Button, _decorator } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { JoystickCtrl } from '../../Entity/JoystickCtrl/JoystickCtrl';
import { Role } from '../../Entity/Role/Role';
import { UIMenu } from '../UIMenu/UIMenu';
import { UIJoystickDemoModel } from './UIJoystickDemoModel';
import { UIJoystickDemoView } from './UIJoystickDemoView';
const { ccclass, property } = _decorator;


@ccclass('UIJoystickDemo')
export class UIJoystickDemo extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIJoystickDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIJoystickDemo';

    public model: UIJoystickDemoModel = undefined;
    public view: UIJoystickDemoView = undefined;

    addEvent() {
        this.on(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    removeEvent() {
        this.off(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    async init() {
        await FY.entity.getEntity(Role, this.view.widget);
        await FY.entity.getEntity(JoystickCtrl, this.view.widget);
        this.view.cShowUIMenu.setSiblingIndex(this.view.widget.children.length);
    }

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.addEvent();

        this.init();
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
            default:
                break;
        }
    }
}