// This script is automatic generation, please do not edit.
// If you need add logic, please write in UILoadingDemoView.ts .
// If you need add data, please write in UILoadingDemoViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, Button, EditBox } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';

const { ccclass, property } = _decorator;


@ccclass('UILoadingDemoView')
export class UILoadingDemoView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UILoadingDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UILoadingDemo';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cShowUILoading: Node;
    public cShowUILoadingUITransform: UITransform = undefined;
    public cShowUILoadingSprite: Sprite = undefined;
    public cShowUILoadingButton: Button = undefined;
    public cTotal: Node;
    public cTotalUITransform: UITransform = undefined;
    public cTotalSprite: Sprite = undefined;
    public cTotalEditBox: EditBox = undefined;
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
        this.cShowUILoading = find('Widget/_ShowUILoading_', this.node);
        this.cShowUILoadingUITransform = this.cShowUILoading.getComponent(UITransform);
        this.cShowUILoadingSprite = this.cShowUILoading.getComponent(Sprite);
        this.cShowUILoadingButton = this.cShowUILoading.getComponent(Button);
        this.cTotal = find('Widget/Total/_Total_', this.node);
        this.cTotalUITransform = this.cTotal.getComponent(UITransform);
        this.cTotalSprite = this.cTotal.getComponent(Sprite);
        this.cTotalEditBox = this.cTotal.getComponent(EditBox);
        this.cShowUIMenu = find('Widget/_ShowUIMenu_', this.node);
        this.cShowUIMenuUITransform = this.cShowUIMenu.getComponent(UITransform);
        this.cShowUIMenuSprite = this.cShowUIMenu.getComponent(Sprite);
        this.cShowUIMenuButton = this.cShowUIMenu.getComponent(Button);
        this.cShowUIMenuWidget = this.cShowUIMenu.getComponent(Widget);
        
    }

    private addEvent() {
        this.cShowUILoadingButton.node.on('click', this.oncShowUILoadingButtonClick, this);
        this.cTotalEditBox.node.on('editing-did-began', this.oncTotalEditBoxEditingBegan, this);
        this.cTotalEditBox.node.on('editing-did-ended', this.oncTotalEditBoxEditingEnded, this);
        this.cTotalEditBox.node.on('editing-return', this.oncTotalEditBoxEditingReturn, this);
        this.cTotalEditBox.node.on('text-changed', this.oncTotalEditBoxTextChanged, this);
        this.cShowUIMenuButton.node.on('click', this.oncShowUIMenuButtonClick, this);

    }

    private removeEvent() {
        this.cShowUILoadingButton.node.off('click', this.oncShowUILoadingButtonClick, this);
        this.cTotalEditBox.node.off('editing-did-began', this.oncTotalEditBoxEditingBegan, this);
        this.cTotalEditBox.node.off('editing-did-ended', this.oncTotalEditBoxEditingEnded, this);
        this.cTotalEditBox.node.off('editing-return', this.oncTotalEditBoxEditingReturn, this);
        this.cTotalEditBox.node.off('text-changed', this.oncTotalEditBoxTextChanged, this);
        this.cShowUIMenuButton.node.off('click', this.oncShowUIMenuButtonClick, this);

    }

    private oncShowUILoadingButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncTotalEditBoxEditingBegan(component: EditBox) {
        this.emit('editing-did-began', component);
    }

    private oncTotalEditBoxEditingEnded(component: EditBox) {
        this.emit('editing-did-ended', component);
    }

    private oncTotalEditBoxEditingReturn(component: EditBox) {
        this.emit('editing-return', component);
    }

    private oncTotalEditBoxTextChanged(component: EditBox) {
        this.emit('text-changed', component);
    }

    private oncShowUIMenuButtonClick(component: Button) {
        this.emit('click', component);
    }


}