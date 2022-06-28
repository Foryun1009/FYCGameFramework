import { Color, Sprite, Tween, tween, Vec3, _decorator, Node } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEntityControllerBase } from '../../../FYFramework/Entity/FYEntityControllerBase';
import { GEnum } from '../../Define/GEnum';
import { UITipsItemModel } from './UITipsItemModel';
import { UITipsItemView } from './UITipsItemView';
const { ccclass, property } = _decorator;


@ccclass('UITipsItem')
export class UITipsItem extends FYEntityControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_UITipsItem';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_UITipsItem';

    public model: UITipsItemModel = undefined;
    public view: UITipsItemView = undefined;

    public setData(content: string): Tween<Node> {
        this.view.cTipsLabel.string = content;
        return this.playTween();
    }

    private playTween(): Tween<Node> {
        let startPosition = new Vec3(0, 0, 0);
        let endPosition = new Vec3(0, 80, 0);
        this.view.cNode.setPosition(startPosition);

        let color = this.view.cNodeSprite.color;
        let showColor = new Color(color.r, color.g, color.b, 255);
        let hideColor = new Color(color.r, color.g, color.b, 0);
        this.view.cNodeSprite.color = hideColor;

        Tween.stopAllByTarget(this.view.cNodeSprite);
        Tween.stopAllByTarget(this.view.cNode);
        tween(this.view.cNodeSprite).to(0.3, { color: showColor }).delay(0.9).to(0.3, { color: hideColor }).start();
        return tween(this.view.cNode).to(1.5, { position: endPosition }, {
            'onComplete': (target: Node) => {
                FY.event.emit(GEnum.GameEvent.UITipsItemTweenComplete);
                target.destroy();
            }
        }).start();
    }
}