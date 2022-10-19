import { EditBox, Slider, _decorator } from 'cc';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIModelBase } from '../../../FYFramework/UI/FYUIModelBase';
const { ccclass, property } = _decorator;


@ccclass('UIViewModelDemoModel')
export class UIViewModelDemoModel extends FYUIModelBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIViewModelDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIViewModelDemo';

    private _value: number = 0;
    public get Value(): number {
        return this._value;
    }

    public set Value(v: number) {
        if (this._value === v) {
            return;
        }

        if (this._value > 100 || this._value < 0) {
            return;
        }

        this._value = v;

        this.emit(FYEnum.Event.ChangeViewValue, 'cValueEditBox', (cValueEditBox: EditBox) => {
            cValueEditBox.string = this._value.toString();
        });

        this.emit(FYEnum.Event.ChangeViewValue, 'cValueChangeSlider', (cValueChangeSlider: Slider) => {
            cValueChangeSlider.progress = this._value / 100.0;
        });
    }
}