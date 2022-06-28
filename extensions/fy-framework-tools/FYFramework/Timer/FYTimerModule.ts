import { FYModule } from "../Base/FYModule";
import FYLog from "../Log/FYLog";
import { FYTimerInfo, OnFYTimer } from "./FYTimerInfo";
/**
 * 定时器模块
 */
export class FYTimerModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYTimerModule";

    /** 是否开始计时 */
    private _bStart = false;
    /** 定时器信息字典 */
    private _dictTimerInfo: { [key: string]: FYTimerInfo } = Object.create(null);;
    /** 
     * 倒计时类型 0 是update 1是setInterval
     * update在切到后台会暂停
     * setInterval切到后台不会暂停
     */
    private _type = 0;

    constructor() {
        super();
        if (this._type === 1) {
            let dt = 1000;
            window.setInterval(() => {
                this.do(dt / 1000);
            }, dt);
        }
    }

    /**
     * 添加计时器
     * @param key 关键字
     * @param needTime 需要时间 计时器一共执行多久 -1: 一直执行
     * @param intervalTime 间隔时间 多久执行一次回调 -1: 直到结束 中间都不执行回调
     * @param callback 回调函数
     */
    public add(key: string, needTime: number, intervalTime: number, callback: OnFYTimer) {
        if (this._dictTimerInfo[key]) {
            FYLog.warn("key = " + key + "is already exist");
            // delete this._dictCountDownInfo[key];
        }

        let timerInfo = new FYTimerInfo(key, needTime, intervalTime, callback);
        this._dictTimerInfo[key] = timerInfo;

        this._bStart = true;
    }


    /**
     * 移除计时器
     * @param key 关键字
     */
    public remove(key: string) {
        if (this._dictTimerInfo[key]) {
            delete this._dictTimerInfo[key];
        }
    }

    /**
     * 获取剩余时间
     * @param key 关键字
     */
    public getRemainTime(key: string) {
        if (this._dictTimerInfo[key]) {
            return this._dictTimerInfo[key].needTime - this._dictTimerInfo[key].curTime;
        }
    }

    /**
     * 获取当前时间
     * @param key 关键字
     * @returns 
     */
    public getCurTime(key: string) {
        if (this._dictTimerInfo[key]) {
            return this._dictTimerInfo[key].curTime;
        }
    }

    /**
     * 获取计时器类型
     */
    public getType(){
        return this._type;
    }

    /**
     * 执行计时逻辑
     * @param dt 间隔时间
     * @returns 
     */
    public do(dt: number) {
        if (!this._bStart) {
            return;
        }

        for (let key in this._dictTimerInfo) {
            let timerInfo: FYTimerInfo = this._dictTimerInfo[key];
            timerInfo.curTime += dt;
            if (timerInfo.intervalTime != -1) {
                timerInfo.intervalTotalTime += dt;
            }
            if (timerInfo.needTime != -1 && timerInfo.curTime >= timerInfo.needTime) {
                delete this._dictTimerInfo[key];

                if (Object.keys(this._dictTimerInfo).length === 0) {
                    // 倒计时停止
                    this._bStart = false;
                }

                if (timerInfo.cb) {
                    timerInfo.cb(true, timerInfo.curTime);
                }
            } else if (timerInfo.intervalTime != -1 && timerInfo.intervalTotalTime >= timerInfo.intervalTime) {
                if (timerInfo.cb) {
                    // 到达指定间隔时间 则执行回调 并返回当前累计时间
                    timerInfo.cb(false, timerInfo.curTime);
                }
                timerInfo.intervalTotalTime = 0;
            }
        }
    }
}