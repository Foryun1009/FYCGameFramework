// This script is automatic generation, please do not edit.
// If you need add logic, please write in UIAudioDemoView.ts .
// If you need add data, please write in UIAudioDemoViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, Button, Toggle } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';

const { ccclass, property } = _decorator;


@ccclass('UIAudioDemoView')
export class UIAudioDemoView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIAudioDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIAudioDemo';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cMask: Node;
    public cMaskUITransform: UITransform = undefined;
    public cMaskSprite: Sprite = undefined;
    public cMaskWidget: Widget = undefined;
    public cMaskButton: Button = undefined;
    public cAudio: Node;
    public cAudioUITransform: UITransform = undefined;
    public cAudioSprite: Sprite = undefined;
    public cAudioToggle: Toggle = undefined;
    public cPlay: Node;
    public cPlayUITransform: UITransform = undefined;
    public cPlaySprite: Sprite = undefined;
    public cPlayToggle: Toggle = undefined;
    public cClose: Node;
    public cCloseUITransform: UITransform = undefined;
    public cCloseSprite: Sprite = undefined;
    public cCloseButton: Button = undefined;
    

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
        this.cMask = find('Widget/_Mask_', this.node);
        this.cMaskUITransform = this.cMask.getComponent(UITransform);
        this.cMaskSprite = this.cMask.getComponent(Sprite);
        this.cMaskWidget = this.cMask.getComponent(Widget);
        this.cMaskButton = this.cMask.getComponent(Button);
        this.cAudio = find('Widget/AudioGroup/_Audio_', this.node);
        this.cAudioUITransform = this.cAudio.getComponent(UITransform);
        this.cAudioSprite = this.cAudio.getComponent(Sprite);
        this.cAudioToggle = this.cAudio.getComponent(Toggle);
        this.cPlay = find('Widget/PlayGroup/_Play_', this.node);
        this.cPlayUITransform = this.cPlay.getComponent(UITransform);
        this.cPlaySprite = this.cPlay.getComponent(Sprite);
        this.cPlayToggle = this.cPlay.getComponent(Toggle);
        this.cClose = find('Widget/_Close_', this.node);
        this.cCloseUITransform = this.cClose.getComponent(UITransform);
        this.cCloseSprite = this.cClose.getComponent(Sprite);
        this.cCloseButton = this.cClose.getComponent(Button);
        
    }

    private addEvent() {
        this.cMaskButton.node.on('click', this.oncMaskButtonClick, this);
        this.cAudioToggle.node.on('toggle', this.oncAudioToggleToggle, this);
        this.cPlayToggle.node.on('toggle', this.oncPlayToggleToggle, this);
        this.cCloseButton.node.on('click', this.oncCloseButtonClick, this);

    }

    private removeEvent() {
        this.cMaskButton.node.off('click', this.oncMaskButtonClick, this);
        this.cAudioToggle.node.off('toggle', this.oncAudioToggleToggle, this);
        this.cPlayToggle.node.off('toggle', this.oncPlayToggleToggle, this);
        this.cCloseButton.node.off('click', this.oncCloseButtonClick, this);

    }

    private oncMaskButtonClick(component: Button) {
        this.emit('click', component);
    }

    private oncAudioToggleToggle(component: Toggle) {
        this.emit('toggle', component);
    }

    private oncPlayToggleToggle(component: Toggle) {
        this.emit('toggle', component);
    }

    private oncCloseButtonClick(component: Button) {
        this.emit('click', component);
    }


}