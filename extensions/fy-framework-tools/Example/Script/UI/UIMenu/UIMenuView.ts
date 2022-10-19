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
    public cShowUILoadingDemo: Node;
    public cShowUILoadingDemoUITransform: UITransform = undefined;
    public cShowUILoadingDemoSprite: Sprite = undefined;
    public cShowUILoadingDemoButton: Button = undefined;
    public cShowUIJoystickDemo: Node;
    public cShowUIJoystickDemoUITransform: UITransform = undefined;
    public cShowUIJoystickDemoSprite: Sprite = undefined;
    public cShowUIJoystickDemoButton: Button = undefined;
    public cShowUIConfigDemo: Node;
    public cShowUIConfigDemoUITransform: UITransform = undefined;
    public cShowUIConfigDemoSprite: Sprite = undefined;
    public cShowUIConfigDemoButton: Button = undefined;
    public cShowUIResourceDemo: Node;
    public cShowUIResourceDemoUITransform: UITransform = undefined;
    public cShowUIResourceDemoSprite: Sprite = undefined;
    public cShowUIResourceDemoButton: Button = undefined;
    public cShowUIAudioDemo: Node;
    public cShowUIAudioDemoUITransform: UITransform = undefined;
    public cShowUIAudioDemoSprite: Sprite = undefined;
    public cShowUIAudioDemoButton: Button = undefined;
    public cShowUIDiamondChangeDemo: Node;
    public cShowUIDiamondChangeDemoUITransform: UITransform = undefined;
    public cShowUIDiamondChangeDemoSprite: Sprite = undefined;
    public cShowUIDiamondChangeDemoButton: Button = undefined;
    public cShowUIViewModelDemo: Node;
    public cShowUIViewModelDemoUITransform: UITransform = undefined;
    public cShowUIViewModelDemoSprite: Sprite = undefined;
    public cShowUIViewModelDemoButton: Button = undefined;
    

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
        this.cShowUITips = find('Widget/Layout/_ShowUITips_', this.node);
        this.cShowUITipsUITransform = this.cShowUITips.getComponent(UITransform);
        this.cShowUITipsSprite = this.cShowUITips.getComponent(Sprite);
        this.cShowUITipsButton = this.cShowUITips.getComponent(Button);
        this.cShowUIMessageBox = find('Widget/Layout/_ShowUIMessageBox_', this.node);
        this.cShowUIMessageBoxUITransform = this.cShowUIMessageBox.getComponent(UITransform);
        this.cShowUIMessageBoxSprite = this.cShowUIMessageBox.getComponent(Sprite);
        this.cShowUIMessageBoxButton = this.cShowUIMessageBox.getComponent(Button);
        this.cShowUILoadingDemo = find('Widget/Layout/_ShowUILoadingDemo_', this.node);
        this.cShowUILoadingDemoUITransform = this.cShowUILoadingDemo.getComponent(UITransform);
        this.cShowUILoadingDemoSprite = this.cShowUILoadingDemo.getComponent(Sprite);
        this.cShowUILoadingDemoButton = this.cShowUILoadingDemo.getComponent(Button);
        this.cShowUIJoystickDemo = find('Widget/Layout/_ShowUIJoystickDemo_', this.node);
        this.cShowUIJoystickDemoUITransform = this.cShowUIJoystickDemo.getComponent(UITransform);
        this.cShowUIJoystickDemoSprite = this.cShowUIJoystickDemo.getComponent(Sprite);
        this.cShowUIJoystickDemoButton = this.cShowUIJoystickDemo.getComponent(Button);
        this.cShowUIConfigDemo = find('Widget/Layout/_ShowUIConfigDemo_', this.node);
        this.cShowUIConfigDemoUITransform = this.cShowUIConfigDemo.getComponent(UITransform);
        this.cShowUIConfigDemoSprite = this.cShowUIConfigDemo.getComponent(Sprite);
        this.cShowUIConfigDemoButton = this.cShowUIConfigDemo.getComponent(Button);
        this.cShowUIResourceDemo = find('Widget/Layout/_ShowUIResourceDemo_', this.node);
        this.cShowUIResourceDemoUITransform = this.cShowUIResourceDemo.getComponent(UITransform);
        this.cShowUIResourceDemoSprite = this.cShowUIResourceDemo.getComponent(Sprite);
        this.cShowUIResourceDemoButton = this.cShowUIResourceDemo.getComponent(Button);
        this.cShowUIAudioDemo = find('Widget/Layout/_ShowUIAudioDemo_', this.node);
        this.cShowUIAudioDemoUITransform = this.cShowUIAudioDemo.getComponent(UITransform);
        this.cShowUIAudioDemoSprite = this.cShowUIAudioDemo.getComponent(Sprite);
        this.cShowUIAudioDemoButton = this.cShowUIAudioDemo.getComponent(Button);
        this.cShowUIDiamondChangeDemo = find('Widget/Layout/_ShowUIDiamondChangeDemo_', this.node);
        this.cShowUIDiamondChangeDemoUITransform = this.cShowUIDiamondChangeDemo.getComponent(UITransform);
        this.cShowUIDiamondChangeDemoSprite = this.cShowUIDiamondChangeDemo.getComponent(Sprite);
        this.cShowUIDiamondChangeDemoButton = this.cShowUIDiamondChangeDemo.getComponent(Button);
        this.cShowUIViewModelDemo = find('Widget/Layout/_ShowUIViewModelDemo_', this.node);
        this.cShowUIViewModelDemoUITransform = this.cShowUIViewModelDemo.getComponent(UITransform);
        this.cShowUIViewModelDemoSprite = this.cShowUIViewModelDemo.getComponent(Sprite);
        this.cShowUIViewModelDemoButton = this.cShowUIViewModelDemo.getComponent(Button);
        
    }

    private addEvent() {
        this.cShowUITipsButton.node.on('click', this.oncShowUITipsButtonClick, this);
        this.cShowUIMessageBoxButton.node.on('click', this.oncShowUIMessageBoxButtonClick, this);
        this.cShowUILoadingDemoButton.node.on('click', this.oncShowUILoadingDemoButtonClick, this);
        this.cShowUIJoystickDemoButton.node.on('click', this.oncShowUIJoystickDemoButtonClick, this);
        this.cShowUIConfigDemoButton.node.on('click', this.oncShowUIConfigDemoButtonClick, this);
        this.cShowUIResourceDemoButton.node.on('click', this.oncShowUIResourceDemoButtonClick, this);
        this.cShowUIAudioDemoButton.node.on('click', this.oncShowUIAudioDemoButtonClick, this);
        this.cShowUIDiamondChangeDemoButton.node.on('click', this.oncShowUIDiamondChangeDemoButtonClick, this);
        this.cShowUIViewModelDemoButton.node.on('click', this.oncShowUIViewModelDemoButtonClick, this);

    }

    private removeEvent() {
        this.cShowUITipsButton.node.off('click', this.oncShowUITipsButtonClick, this);
        this.cShowUIMessageBoxButton.node.off('click', this.oncShowUIMessageBoxButtonClick, this);
        this.cShowUILoadingDemoButton.node.off('click', this.oncShowUILoadingDemoButtonClick, this);
        this.cShowUIJoystickDemoButton.node.off('click', this.oncShowUIJoystickDemoButtonClick, this);
        this.cShowUIConfigDemoButton.node.off('click', this.oncShowUIConfigDemoButtonClick, this);
        this.cShowUIResourceDemoButton.node.off('click', this.oncShowUIResourceDemoButtonClick, this);
        this.cShowUIAudioDemoButton.node.off('click', this.oncShowUIAudioDemoButtonClick, this);
        this.cShowUIDiamondChangeDemoButton.node.off('click', this.oncShowUIDiamondChangeDemoButtonClick, this);
        this.cShowUIViewModelDemoButton.node.off('click', this.oncShowUIViewModelDemoButtonClick, this);

    }

    private oncShowUITipsButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIMessageBoxButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUILoadingDemoButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIJoystickDemoButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIConfigDemoButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIResourceDemoButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIAudioDemoButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIDiamondChangeDemoButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncShowUIViewModelDemoButtonClick(component: Button) {
        this.emit('click', component);
    }


}