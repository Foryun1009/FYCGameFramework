import { Color, Sprite, Tween, tween, Vec3, _decorator, Node } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { GEnum } from '../../Define/GEnum';
import { UITipsItem } from '../../Entity/UITipsItem/UITipsItem';
import { UITipsModel } from './UITipsModel';
import { UITipsView } from './UITipsView';
const { ccclass, property } = _decorator;


@ccclass('UITips')
export class UITips extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UITips';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UITips';

    public model: UITipsModel = undefined;
    public view: UITipsView = undefined;

    private _count = 0;
    private _listTween: Array<Tween<Node>> = [];

    public async setData(content: string) {
        this._count++;
        this._listTween.push((await FY.entity.getEntity(UITipsItem, this.view.widget, FYEnum.ResourceCacheType.AutoRelease)).setData(content));
    }

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        FY.event.on(GEnum.GameEvent.UITipsItemTweenComplete, this.onUITipsItemTweenComplete, this);
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        FY.event.off(GEnum.GameEvent.UITipsItemTweenComplete, this.onUITipsItemTweenComplete, this);
        this._listTween.forEach(element => {
            if (element) {
                element.stop();
                element.removeSelf();
            }
        });
        this._listTween = [];
        this._count = 0;
    }

    private onUITipsItemTweenComplete(msgType: string) {
        if (this._count <= 0) {
            this.close();
        }
        // console.log(this.view.widget.children.length);
        // this.view.widget.children.forEach(element => {
        //     console.log(element.name);
        // });
    }
}