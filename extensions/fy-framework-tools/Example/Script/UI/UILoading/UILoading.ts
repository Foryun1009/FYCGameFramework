import { _decorator } from 'cc';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { UILoadingModel } from './UILoadingModel';
import { UILoadingView } from './UILoadingView';
const { ccclass, property } = _decorator;


@ccclass('UILoading')
export class UILoading extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UILoading';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UILoading';

    public model: UILoadingModel = undefined;
    public view: UILoadingView = undefined;

    private _cb: Function = undefined;

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }
    }

    public setData(totalNum: number, cb: Function) {
        this.model.totalNum = totalNum;
        this.model.curNum = 0;
        this._cb = cb;
    }

    public updateData(curNum: number) {
        this.model.curNum = curNum;
        if (curNum >= this.model.totalNum && this._cb) {
            this._cb();
        }
    }
}