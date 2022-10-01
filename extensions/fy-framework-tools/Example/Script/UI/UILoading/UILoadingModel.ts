import { Label, ProgressBar, _decorator } from 'cc';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIModelBase } from '../../../FYFramework/UI/FYUIModelBase';
const { ccclass, property } = _decorator;


@ccclass('UILoadingModel')
export class UILoadingModel extends FYUIModelBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UILoading';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UILoading';

    private _curNum: number = 0;
    public get curNum() {
        return this._curNum;
    }
    /** 当前数值 */
    public set curNum(v: number) {
        if (this._curNum === v) {
            return;
        }

        this._curNum = v;

        if (this._totalNum > 0 && this._curNum <= this._totalNum && this._curNum >= 0) {
            this.emit(FYEnum.Event.ChangeViewValue, 'cProgressProgressBar', (cProgressProgressBar: ProgressBar) => {
                cProgressProgressBar.progress = this._curNum / this._totalNum;
            });

            this.emit(FYEnum.Event.ChangeViewValue, 'cProgressNumLabel', (cProgressNumLabel: Label) => {
                cProgressNumLabel.string = Math.round(this._curNum / this._totalNum * 100) + '%';
            });
        }
    }

    private _totalNum: number = 0;
    public get totalNum() {
        return this._totalNum;
    }
    /** 总数值 */
    public set totalNum(v: number) {
        if (this._totalNum === v) {
            return;
        }

        this._totalNum = v;

        if (this._totalNum > 0 && this._curNum <= this._totalNum && this._curNum >= 0) {
            this.emit(FYEnum.Event.ChangeViewValue, 'cProgressProgressBar', (cProgressProgressBar: ProgressBar) => {
                cProgressProgressBar.progress = this._curNum / this._totalNum;
            });

            this.emit(FYEnum.Event.ChangeViewValue, 'cProgressNumLabel', (cProgressNumLabel: Label) => {
                cProgressNumLabel.string = Math.round(this._curNum / this._totalNum * 100) + '%';
            });
        }
    }
}