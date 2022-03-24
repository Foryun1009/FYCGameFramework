/**
 * 默认网络辅助器
 */

import { FYNetHelperBase } from "./FYNetHelperBase";

export class DefaultNetHelper extends FYNetHelperBase {
    /**
    * 连接
    * @param host 地址
    * @param port 端口号
    * @param cb 回调函数
    */
    public connect(host: string, port: number, cb: (data: any) => void): void {

    }
    /**
     * 消息请求 有回复
     * @param route 消息类型
     * @param msg 消息体
     * @param cb 回调函数
     */
    public request(route: string, msg: any, cb: (data: any) => void): void {

    }
    /**
     * 消息通知 没回复
     * @param route 消息类型
     * @param msg 消息体
     */
    public notify(route: string, msg: any): void {

    }
    /**
     * 服务器推送消息监听
     * @param route 消息类型
     * @param cb 回调
     */
    public on(route: string, cb: (...params) => void): void {

    }
    /**
     * 服务器推送消息取消监听
     * @param route 消息类型
     * @param cb 回调
     */
    public off(route: string, cb: (...params) => void): void {

    }
    /**
     * 断开连接
     */
    public disconnect() {

    }

}