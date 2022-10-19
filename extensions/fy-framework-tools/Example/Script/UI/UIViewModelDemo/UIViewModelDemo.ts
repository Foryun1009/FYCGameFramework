import { Button, EditBox, Slider, _decorator } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { UIMenu } from '../UIMenu/UIMenu';
import { UIViewModelDemoModel } from './UIViewModelDemoModel';
import { UIViewModelDemoView } from './UIViewModelDemoView';
const { ccclass, property } = _decorator;


@ccclass('UIViewModelDemo')
export class UIViewModelDemo extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIViewModelDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIViewModelDemo';

    public model: UIViewModelDemoModel = undefined;
    public view: UIViewModelDemoView = undefined;

    addEvent() {
        this.on(FYEnum.UIEvent.SliderSlide, this.onSliderSlide, this);
        this.on(FYEnum.UIEvent.EditBoxTextChanged, this.onEditBoxTextChanged, this);
        this.on(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    removeEvent() {
        this.off(FYEnum.UIEvent.SliderSlide, this.onSliderSlide, this);
        this.off(FYEnum.UIEvent.EditBoxTextChanged, this.onEditBoxTextChanged, this);
        this.off(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    init() {
        this.model.Value = 50;
    }

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.addEvent();

        this.init();
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.removeEvent();
    }

    /**
    * 
    * @param eventType 事件类型
    * @param component 触发事件的组件
    */
    private async onButtonClick(eventType: string, component: Button) {
        // FYLog.log(`点击了 ${component.name}`);
        switch (component.name) {
            case this.view.cShowUIMenuButton.name:
                await FY.ui.open(UIMenu);
                this.close();
                break;
            default:
                break;
        }
    }

    private onSliderSlide(eventType: string, slider: Slider) {
        this.model.Value = Math.floor(slider.progress * 100);
    }

    private onEditBoxTextChanged(eventType: string, editBox: EditBox) {
        let num = Number(editBox.string);
        if (num > 100) {
            num = 100;
            editBox.string = '100';
        } else if (num < 0) {
            num = 0;
            editBox.string = '0'
        }

        this.model.Value = num;
    }
}