import { _decorator, CCFloat, Component, math, Node, Tween, tween } from 'cc';
import { FY } from '../Base/FY';
const { ccclass, property } = _decorator;

/**
 * 序列帧动画
 */
@ccclass('SequenceFrameAnimation')
export class SequenceFrameAnimation extends Component {
    @property({
        type: [Node],
        displayName: '帧数组',
    })
    public frameArray: Array<Node> = [];

    @property({
        type: CCFloat,
        displayName: '间隔时间',
    })
    public interval: number = 1;

    /* 当前索引 */
    private _curIndex: number = 0;

    private _tween: Tween<any> = null;

    protected onEnable(): void {
        this._tween = tween(this.node)
            .to(this.interval * this.frameArray.length, {}, {
                onUpdate: (target, ratio) => {
                    this._curIndex = Math.floor(this.frameArray.length * ratio) % this.frameArray.length;
                    this.setFrameActive(this._curIndex);
                }
            }).repeatForever()
            .start();
    }

    protected onDisable(): void {
        if (this._tween) {
            this._tween.stop();
        }
    }

    setFrameActive(index: number) {
        this.frameArray.forEach(element => {
            element.active = false;
        });
        if (index < this.frameArray.length) {
            this.frameArray[index].active = true;
        }
    }
}


