// This script is automatic generation, please do not edit.
// If you need add logic, please write in UITipsItemView.ts .
// If you need add data, please write in UITipsItemViewModel.ts .

import { _decorator, find, Node, UITransform, Sprite, Label } from 'cc';
import { FYEntityViewBase } from '../../../FYFramework/Entity/FYEntityViewBase';
const { ccclass, property } = _decorator;


@ccclass('UITipsItemView')
export class UITipsItemView extends FYEntityViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_UITipsItem';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_UITipsItem';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeSprite: Sprite = undefined;
    public cTips: Node;
    public cTipsUITransform: UITransform = undefined;
    public cTipsLabel: Label = undefined;
    

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
        this.cNodeSprite = this.cNode.getComponent(Sprite);
        this.cTips = find('_Tips_', this.node);
        this.cTipsUITransform = this.cTips.getComponent(UITransform);
        this.cTipsLabel = this.cTips.getComponent(Label);
        
    }

    private addEvent() {

    }

    private removeEvent() {

    }


}