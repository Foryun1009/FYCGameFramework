// This script is automatic generation, please do not edit.
// If you need add logic, please write in UIJoystickDemoView.ts .
// If you need add data, please write in UIJoystickDemoViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, Button } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';

const { ccclass, property } = _decorator;


@ccclass('UIJoystickDemoView')
export class UIJoystickDemoView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIJoystickDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIJoystickDemo';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cShowUIMenu: Node;
    public cShowUIMenuUITransform: UITransform = undefined;
    public cShowUIMenuSprite: Sprite = undefined;
    public cShowUIMenuButton: Button = undefined;
    public cShowUIMenuWidget: Widget = undefined;
    

    public onLoad() {
        this.initComponent();
    }

    public onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.addEvent();
    }

    public onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.removeEvent();
    } 

    private initComponent() {
        this.cNode = this.node;
        this.cNodeUITransform = this.cNode.getComponent(UITransform);
        this.cNodeWidget = this.cNode.getComponent(Widget);
        this.cShowUIMenu = find('Widget/_ShowUIMenu_', this.node);
        this.cShowUIMenuUITransform = this.cShowUIMenu.getComponent(UITransform);
        this.cShowUIMenuSprite = this.cShowUIMenu.getComponent(Sprite);
        this.cShowUIMenuButton = this.cShowUIMenu.getComponent(Button);
        this.cShowUIMenuWidget = this.cShowUIMenu.getComponent(Widget);
        
    }

    private addEvent() {
        this.cShowUIMenuButton.node.on('click', this.oncShowUIMenuButtonClick, this);

    }

    private removeEvent() {
        this.cShowUIMenuButton.node.off('click', this.oncShowUIMenuButtonClick, this);

    }

    private oncShowUIMenuButtonClick(component: Button) {
        this.emit('click', component);
    }


}