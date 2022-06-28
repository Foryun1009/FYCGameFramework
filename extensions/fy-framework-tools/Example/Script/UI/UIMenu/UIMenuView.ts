// This script is automatic generation, please do not edit.
// If you need add logic, please write in UIMenuView.ts .
// If you need add data, please write in UIMenuViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, Button } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';
const { ccclass, property } = _decorator;


@ccclass('UIMenuView')
export class UIMenuView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIMenu';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIMenu';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cShowUITips: Node;
    public cShowUITipsUITransform: UITransform = undefined;
    public cShowUITipsSprite: Sprite = undefined;
    public cShowUITipsButton: Button = undefined;
    public cShowUIMessageBox: Node;
    public cShowUIMessageBoxUITransform: UITransform = undefined;
    public cShowUIMessageBoxSprite: Sprite = undefined;
    public cShowUIMessageBoxButton: Button = undefined;
    

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
        this.cShowUITips = find('Widget/_ShowUITips_', this.node);
        this.cShowUITipsUITransform = this.cShowUITips.getComponent(UITransform);
        this.cShowUITipsSprite = this.cShowUITips.getComponent(Sprite);
        this.cShowUITipsButton = this.cShowUITips.getComponent(Button);
        this.cShowUIMessageBox = find('Widget/_ShowUIMessageBox_', this.node);
        this.cShowUIMessageBoxUITransform = this.cShowUIMessageBox.getComponent(UITransform);
        this.cShowUIMessageBoxSprite = this.cShowUIMessageBox.getComponent(Sprite);
        this.cShowUIMessageBoxButton = this.cShowUIMessageBox.getComponent(Button);
        
    }

    private addEvent() {
        this.cShowUITipsButton.node.on('click', this.oncShowUITipsButtonClick, this);
        this.cShowUIMessageBoxButton.node.on('click', this.oncShowUIMessageBoxButtonClick, this);

    }

    private removeEvent() {
        this.cShowUITipsButton.node.off('click', this.oncShowUITipsButtonClick, this);
        this.cShowUIMessageBoxButton.node.off('click', this.oncShowUIMessageBoxButtonClick, this);

    }

    private oncShowUITipsButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIMessageBoxButtonClick(component: Button) {
        this.emit('click', component);
    }


}