// This script is automatic generation, please do not edit.
// If you need add logic, please write in UIViewModelDemoView.ts .
// If you need add data, please write in UIViewModelDemoViewModel.ts .

import { _decorator, find, Node, UITransform, Widget, Sprite, Slider, EditBox, Button } from 'cc';
import { FYUIViewBase } from '../../../FYFramework/UI/FYUIViewBase';

const { ccclass, property } = _decorator;


@ccclass('UIViewModelDemoView')
export class UIViewModelDemoView extends FYUIViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIViewModelDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIViewModelDemo';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cValueChange: Node;
    public cValueChangeUITransform: UITransform = undefined;
    public cValueChangeSprite: Sprite = undefined;
    public cValueChangeSlider: Slider = undefined;
    public cValue: Node;
    public cValueUITransform: UITransform = undefined;
    public cValueSprite: Sprite = undefined;
    public cValueEditBox: EditBox = undefined;
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
        this.cValueChange = find('Widget/_ValueChange_', this.node);
        this.cValueChangeUITransform = this.cValueChange.getComponent(UITransform);
        this.cValueChangeSprite = this.cValueChange.getComponent(Sprite);
        this.cValueChangeSlider = this.cValueChange.getComponent(Slider);
        this.cValue = find('Widget/_Value_', this.node);
        this.cValueUITransform = this.cValue.getComponent(UITransform);
        this.cValueSprite = this.cValue.getComponent(Sprite);
        this.cValueEditBox = this.cValue.getComponent(EditBox);
        this.cShowUIMenu = find('Widget/_ShowUIMenu_', this.node);
        this.cShowUIMenuUITransform = this.cShowUIMenu.getComponent(UITransform);
        this.cShowUIMenuSprite = this.cShowUIMenu.getComponent(Sprite);
        this.cShowUIMenuButton = this.cShowUIMenu.getComponent(Button);
        this.cShowUIMenuWidget = this.cShowUIMenu.getComponent(Widget);
        
    }

    private addEvent() {
        this.cValueChangeSlider.node.on('slide', this.oncValueChangeSliderSlide, this);
        this.cValueEditBox.node.on('editing-did-began', this.oncValueEditBoxEditingBegan, this);
        this.cValueEditBox.node.on('editing-did-ended', this.oncValueEditBoxEditingEnded, this);
        this.cValueEditBox.node.on('editing-return', this.oncValueEditBoxEditingReturn, this);
        this.cValueEditBox.node.on('text-changed', this.oncValueEditBoxTextChanged, this);
        this.cShowUIMenuButton.node.on('click', this.oncShowUIMenuButtonClick, this);

    }

    private removeEvent() {
        this.cValueChangeSlider.node.off('slide', this.oncValueChangeSliderSlide, this);
        this.cValueEditBox.node.off('editing-did-began', this.oncValueEditBoxEditingBegan, this);
        this.cValueEditBox.node.off('editing-did-ended', this.oncValueEditBoxEditingEnded, this);
        this.cValueEditBox.node.off('editing-return', this.oncValueEditBoxEditingReturn, this);
        this.cValueEditBox.node.off('text-changed', this.oncValueEditBoxTextChanged, this);
        this.cShowUIMenuButton.node.off('click', this.oncShowUIMenuButtonClick, this);

    }

    private oncValueChangeSliderSlide(component: Slider) {
        this.emit('slide', component);
    }

    private oncValueEditBoxEditingBegan(component: EditBox) {
        this.emit('editing-did-began', component);
    }

    private oncValueEditBoxEditingEnded(component: EditBox) {
        this.emit('editing-did-ended', component);
    }

    private oncValueEditBoxEditingReturn(component: EditBox) {
        this.emit('editing-return', component);
    }

    private oncValueEditBoxTextChanged(component: EditBox) {
        this.emit('text-changed', component);
    }

    private oncShowUIMenuButtonClick(component: Button) {
        this.emit('click', component);
    }


}