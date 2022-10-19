// This script is automatic generation, please do not edit.
// If you need add logic, please write in UIResourceDemoView.ts .
// If you need add data, please write in UIResourceDemoViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, Button } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';

const { ccclass, property } = _decorator;


@ccclass('UIResourceDemoView')
export class UIResourceDemoView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIResourceDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIResourceDemo';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cShowUIMenu: Node;
    public cShowUIMenuUITransform: UITransform = undefined;
    public cShowUIMenuSprite: Sprite = undefined;
    public cShowUIMenuButton: Button = undefined;
    public cShowUIMenuWidget: Widget = undefined;
    public cLoadSprite1: Node;
    public cLoadSprite1UITransform: UITransform = undefined;
    public cLoadSprite1Sprite: Sprite = undefined;
    public cLoadSprite1Button: Button = undefined;
    public cLoadSprite1Widget: Widget = undefined;
    public cLoadSprite2: Node;
    public cLoadSprite2UITransform: UITransform = undefined;
    public cLoadSprite2Sprite: Sprite = undefined;
    public cLoadSprite2Button: Button = undefined;
    public cLoadSprite2Widget: Widget = undefined;
    public cIcon: Node;
    public cIconUITransform: UITransform = undefined;
    public cIconSprite: Sprite = undefined;
    

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
        this.cLoadSprite1 = find('Widget/_LoadSprite1_', this.node);
        this.cLoadSprite1UITransform = this.cLoadSprite1.getComponent(UITransform);
        this.cLoadSprite1Sprite = this.cLoadSprite1.getComponent(Sprite);
        this.cLoadSprite1Button = this.cLoadSprite1.getComponent(Button);
        this.cLoadSprite1Widget = this.cLoadSprite1.getComponent(Widget);
        this.cLoadSprite2 = find('Widget/_LoadSprite2_', this.node);
        this.cLoadSprite2UITransform = this.cLoadSprite2.getComponent(UITransform);
        this.cLoadSprite2Sprite = this.cLoadSprite2.getComponent(Sprite);
        this.cLoadSprite2Button = this.cLoadSprite2.getComponent(Button);
        this.cLoadSprite2Widget = this.cLoadSprite2.getComponent(Widget);
        this.cIcon = find('Widget/ShowIcon/_Icon_', this.node);
        this.cIconUITransform = this.cIcon.getComponent(UITransform);
        this.cIconSprite = this.cIcon.getComponent(Sprite);
        
    }

    private addEvent() {
        this.cShowUIMenuButton.node.on('click', this.oncShowUIMenuButtonClick, this);
        this.cLoadSprite1Button.node.on('click', this.oncLoadSprite1ButtonClick, this);
        this.cLoadSprite2Button.node.on('click', this.oncLoadSprite2ButtonClick, this);

    }

    private removeEvent() {
        this.cShowUIMenuButton.node.off('click', this.oncShowUIMenuButtonClick, this);
        this.cLoadSprite1Button.node.off('click', this.oncLoadSprite1ButtonClick, this);
        this.cLoadSprite2Button.node.off('click', this.oncLoadSprite2ButtonClick, this);

    }

    private oncShowUIMenuButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncLoadSprite1ButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncLoadSprite2ButtonClick(component: Button) {
        this.emit('click', component);
    }


}