
import { _decorator, Asset, Script } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { FYNetHelperBase } from './FYNetHelperBase';
import { FYNetModule } from './FYNetModule';
const { ccclass, menu } = _decorator;

/**
 * 网络组件
 */

@ccclass('FYNetComponent')
@menu('FY/FYNetComponent')
export class FYNetComponent extends FYComponent {

    private _net: FYNetModule;
    /** 网络模块 */
    public get net(): FYNetModule {
        if (!this._net) {
            this._net = FYEntry.getModule(FYNetModule);
        }

        return this._net
    }

    onLoad() {
        super.onLoad();
    }

    /**
     * 设置辅助器
     * @param netHelper 网络辅助器
     * @param netName 网络链接名，如果有多个网络链接，则用名字区分
     */
    public setHelper(netHelper: FYNetHelperBase, netName?: string) {
        this.net.setHelper(netHelper, netName);
    }

    /**
     * 连接
     * @param host 地址
     * @param port 端口号
     * @param cb 回调
     * @param netName 网络链接名，如果有多个网络链接，则用名字区分
     */
    public connect(host: string, port: number, cb: (data?: any) => void, netName?: string) {
        this.net.connect(host, port, cb, netName);
    }

    /**
     * 消息请求 有回复
     * @param route 消息类型
     * @param msg 消息体
     * @param cb 回调
     * @param netName 网络链接名，如果有多个网络链接，则用名字区分
     */
    public request(route: string, msg: any, cb: (data: any) => void, netName?: string) {
        this.net.request(route, msg, cb, netName)
    }

    /**
     * 消息通知 没回复
     * @param route 消息类型
     * @param msg 消息体
     * @param netName 网络链接名，如果有多个网络链接，则用名字区分
     */
    public notify(route: string, msg: any, netName?: string) {
        this.net.notify(route, msg, netName);
    }

    /**
     * 服务器推送消息监听
     * @param route 消息类型
     * @param cb 回调
     * @param netName 网络链接名，如果有多个网络链接，则用名字区分
     */
    public on(route: string, cb: (...params) => void, netName?: string) {
        this.net.on(route, cb, netName);
    }

    /**
     * 服务器推送消息取消监听
     * @param route 消息类型
     * @param cb 回调
     * @param netName 网络链接名，如果有多个网络链接，则用名字区分
     */
    public off(route: string, cb: (...params) => void, netName?: string) {
        this.net.off(route, cb, netName);
    }

    /**
     * 断开连接
     * @param netName 网络链接名，如果有多个网络链接，则用名字区分
     */
    public disconnect(netName?: string) {
        this.net.disconnect(netName);
    }

}