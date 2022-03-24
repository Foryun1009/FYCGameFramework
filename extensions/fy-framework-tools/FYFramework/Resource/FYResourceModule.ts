
import { _decorator, Component, Node, resources, JsonAsset, Asset, TextAsset, BufferAsset } from 'cc';
import { FYModule } from '../Base/FYModule';
import { Pako } from '../Lib/pako/Pako';
import FYLog from '../Log/FYLog';
const { ccclass } = _decorator;

/**
 * 资源模块
 */

@ccclass('FYResourceModule')
export class FYResourceModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYResourceModule";
    /** 资源路径配置 */
    private _config: { [key: string]: string };

    /**
     * 根据资源名获取资源路径
     * @param resourceName 资源名
     * @returns 
     */
    public async getResourcePath(resourceName: string): Promise<string> {
        if (!this._config) {
            let buffer = (await this.loadPath<BufferAsset>('CFG_ResPath')).buffer();
            if (!buffer) {
                FYLog.error(`Load CFG_ResPath error`);
                return '';
            }

            let compress = Pako.inflate(buffer, { to: 'string' });
            if (!compress) {
                FYLog.error('pako.inflate error');
                return '';
            }

            this._config = JSON.parse(compress);
        }
        // 使用之前，请先成编辑器工具生成ConfigRes.ts文件
        if (!this._config[resourceName]) {
            FYLog.error(`Can not find the resource ${resourceName}`);
            return '';
        }
        return this._config[resourceName];
    }

    /**
     * 根据路径加载资源
     * @param path 资源路径
     * @returns 
     */
    public async loadPath<T extends Asset>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            resources.load<T>(path, (error: Error, resource: T) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(resource);
                return;
            });
        });
    }

    /**
     * 根据资源名加载资源
     * @param name 资源名
     * @param extendPath 扩展路径，有些资源里面还有子资源，例如图片里面有spriteFrame和texture
     * @returns 
     */
    public async load<T extends Asset>(name: string, extendPath?: string): Promise<T> {
        let resourcePath = await this.getResourcePath(name);
        if (extendPath) {
            resourcePath += `/${extendPath}`;
        }
        if (resourcePath === '') {
            return Promise.reject('Resource path is empty');
        }
        return new Promise((resolve, reject) => {
            resources.load<T>(resourcePath, (error: Error, resource: T) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(resource);
                return;
            });
        });
    }
}