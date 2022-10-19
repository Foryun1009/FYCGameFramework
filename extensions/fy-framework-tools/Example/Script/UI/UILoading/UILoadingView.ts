// This script is automatic generation, please do not edit.
// If you need add logic, please write in UILoadingView.ts .
// If you need add data, please write in UILoadingViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, ProgressBar, Label } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';

const { ccclass, property } = _decorator;


@ccclass('UILoadingView')
export class UILoadingView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UILoading';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UILoading';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cProgress: Node;
    public cProgressUITransform: UITransform = undefined;
    public cProgressSprite: Sprite = undefined;
    public cProgressProgressBar: ProgressBar = undefined;
    public cProgressNum: Node;
    public cProgressNumUITransform: UITransform = undefined;
    public cProgressNumLabel: Label = undefined;
    

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
        this.cProgress = find('Widget/_Progress_', this.node);
        this.cProgressUITransform = this.cProgress.getComponent(UITransform);
        this.cProgressSprite = this.cProgress.getComponent(Sprite);
        this.cProgressProgressBar = this.cProgress.getComponent(ProgressBar);
        this.cProgressNum = find('Widget/_Progress_/_ProgressNum_', this.node);
        this.cProgressNumUITransform = this.cProgressNum.getComponent(UITransform);
        this.cProgressNumLabel = this.cProgressNum.getComponent(Label);
        
    }

    private addEvent() {

    }

    private removeEvent() {

    }


}