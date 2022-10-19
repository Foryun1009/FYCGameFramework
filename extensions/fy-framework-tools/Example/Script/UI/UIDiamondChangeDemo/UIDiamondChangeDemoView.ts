// This script is automatic generation, please do not edit.
// If you need add logic, please write in UIDiamondChangeDemoView.ts .
// If you need add data, please write in UIDiamondChangeDemoViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, Button, Label, Toggle } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';

const { ccclass, property } = _decorator;


@ccclass('UIDiamondChangeDemoView')
export class UIDiamondChangeDemoView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIDiamondChangeDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIDiamondChangeDemo';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cShowUIMenu: Node;
    public cShowUIMenuUITransform: UITransform = undefined;
    public cShowUIMenuSprite: Sprite = undefined;
    public cShowUIMenuButton: Button = undefined;
    public cShowUIMenuWidget: Widget = undefined;
    public cDiamondNum: Node;
    public cDiamondNumUITransform: UITransform = undefined;
    public cDiamondNumLabel: Label = undefined;
    public cAutoDiamond: Node;
    public cAutoDiamondUITransform: UITransform = undefined;
    public cAutoDiamondSprite: Sprite = undefined;
    public cAutoDiamondWidget: Widget = undefined;
    public cAutoDiamondToggle: Toggle = undefined;
    public cAddDiamond: Node;
    public cAddDiamondUITransform: UITransform = undefined;
    public cAddDiamondSprite: Sprite = undefined;
    public cAddDiamondButton: Button = undefined;
    public cAddDiamondWidget: Widget = undefined;
    public cReduceDiamond: Node;
    public cReduceDiamondUITransform: UITransform = undefined;
    public cReduceDiamondSprite: Sprite = undefined;
    public cReduceDiamondButton: Button = undefined;
    public cReduceDiamondWidget: Widget = undefined;
    

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
        this.cDiamondNum = find('Widget/Diamond/_DiamondNum_', this.node);
        this.cDiamondNumUITransform = this.cDiamondNum.getComponent(UITransform);
        this.cDiamondNumLabel = this.cDiamondNum.getComponent(Label);
        this.cAutoDiamond = find('Widget/_AutoDiamond_', this.node);
        this.cAutoDiamondUITransform = this.cAutoDiamond.getComponent(UITransform);
        this.cAutoDiamondSprite = this.cAutoDiamond.getComponent(Sprite);
        this.cAutoDiamondWidget = this.cAutoDiamond.getComponent(Widget);
        this.cAutoDiamondToggle = this.cAutoDiamond.getComponent(Toggle);
        this.cAddDiamond = find('Widget/_AddDiamond_', this.node);
        this.cAddDiamondUITransform = this.cAddDiamond.getComponent(UITransform);
        this.cAddDiamondSprite = this.cAddDiamond.getComponent(Sprite);
        this.cAddDiamondButton = this.cAddDiamond.getComponent(Button);
        this.cAddDiamondWidget = this.cAddDiamond.getComponent(Widget);
        this.cReduceDiamond = find('Widget/_ReduceDiamond_', this.node);
        this.cReduceDiamondUITransform = this.cReduceDiamond.getComponent(UITransform);
        this.cReduceDiamondSprite = this.cReduceDiamond.getComponent(Sprite);
        this.cReduceDiamondButton = this.cReduceDiamond.getComponent(Button);
        this.cReduceDiamondWidget = this.cReduceDiamond.getComponent(Widget);
        
    }

    private addEvent() {
        this.cShowUIMenuButton.node.on('click', this.oncShowUIMenuButtonClick, this);
        this.cAutoDiamondToggle.node.on('toggle', this.oncAutoDiamondToggleToggle, this);
        this.cAddDiamondButton.node.on('click', this.oncAddDiamondButtonClick, this);
        this.cReduceDiamondButton.node.on('click', this.oncReduceDiamondButtonClick, this);

    }

    private removeEvent() {
        this.cShowUIMenuButton.node.off('click', this.oncShowUIMenuButtonClick, this);
        this.cAutoDiamondToggle.node.off('toggle', this.oncAutoDiamondToggleToggle, this);
        this.cAddDiamondButton.node.off('click', this.oncAddDiamondButtonClick, this);
        this.cReduceDiamondButton.node.off('click', this.oncReduceDiamondButtonClick, this);

    }

    private oncShowUIMenuButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncAutoDiamondToggleToggle(component: Toggle) {
        this.emit('toggle', component);
    }

    private oncAddDiamondButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncReduceDiamondButtonClick(component: Button) {
        this.emit('click', component);
    }


}