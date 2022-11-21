/**
 * UI模块
 */

import { find, Prefab, Node, instantiate } from "cc";
import { FYEntry } from "../Base/FYEntry";
import { FYModule } from "../Base/FYModule";
import { FYEnum } from "../Define/FYEnum";
import FYLog from "../Log/FYLog";
import { FYLogEnum } from "../Log/FYLogEnum";
import { FYResourceModule } from "../Resource/FYResourceModule";
import FYUtility from "../Utility/FYUtility";
import { FYEntityControllerBase } from "./FYEntityControllerBase";
import { FYEntityViewBase } from "./FYEntityViewBase";

export class FYEntityModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYEntityModule";

    private _resource: FYResourceModule;
    /** 资源模块 */
    public get resource(): FYResourceModule {
        if (!this._resource) {
            this._resource = FYEntry.getModule(FYResourceModule);
        }

        return this._resource
    }

    /**
     * 获取Entity
     * @param Ctor Entity的类
     * @param parent 父对象
     * @param cacheType 是否需要缓存，资源缓存类型
     * @returns 
     */
    public async getEntity<T extends FYEntityControllerBase>(Ctor: new () => T, parent: Node, cacheType: FYEnum.ResourceCacheType = FYEnum.ResourceCacheType.None): Promise<T> {
        let prefabName = FYUtility.getPrefabName(Ctor);
        let clsName = prefabName.substring(9);
        return this.getEntityByName(clsName, parent, cacheType);
    }

    /**
     * 获取Entity
     * @param clsName 类名
     * @param parent 父对象
     * @param cacheType 是否需要缓存，资源缓存类型
     * @returns 
     */
    public async getEntityByName<T extends FYEntityControllerBase>(clsName: string, parent: Node, cacheType: FYEnum.ResourceCacheType = FYEnum.ResourceCacheType.None): Promise<T> {
        return new Promise(async (resolve, reject) => {
            let prefabName = `P_Entity_${clsName}`;
            FYLog.print(`Get entity ${clsName}`, FYLogEnum.Color.Green);

            let prefab = await this.resource.load<Prefab>(prefabName, cacheType).catch((reason) => {
                FYLog.error('Get entity fail, name: ' + prefabName + ", error: " + JSON.stringify(reason));
                reject(new Error('Get entity fail, name: ' + prefabName + ", error: " + JSON.stringify(reason)));
            });

            if (prefab instanceof Prefab) {
                let node = instantiate(prefab);
                let model = node.addComponent(`${clsName}Model`);
                let view = node.addComponent(`${clsName}View`);
                let controller: T = node.addComponent(clsName) as T;
                controller.model = model;
                controller.view = view;
                // 有了父对象 如果默认是激活状态 onLoad和onEnable会立刻被执行
                parent?.addChild(node);
                node.reset();

                resolve(controller);
            }
        });
    }

    /**
     * 实例化Entity
     * @param Ctor Entity的类
     * @param sample 要实例化的对象
     * @param parent 父对象
     * @returns 
     */
    public instantiateEntity<T extends FYEntityControllerBase>(Ctor: new () => T, sample: Node, parent: Node): T {
        let prefabName = FYUtility.getPrefabName(Ctor);
        let clsName = prefabName.substring(9);
        let node = instantiate(sample);
        let model = node.getComponent(`${clsName}Model`);
        if (!model) {
            model = node.addComponent(`${clsName}Model`);
        }
        let view = node.getComponent(`${clsName}View`);
        if (!view) {
            view = node.addComponent(`${clsName}View`);
        }
        let controller = node.getComponent(Ctor);
        if (!controller) {
            controller = node.addComponent(Ctor);
        }
        controller.model = model;
        controller.view = view;
        // 有了父对象 如果默认是激活状态 onLoad和onEnable会立刻被执行
        parent?.addChild(node);
        node.reset();
        return controller;
    }

    /**
     * 释放Entity
     * @param Ctor Entity的类
     */
    public releaseEntity<T extends FYEntityControllerBase>(Ctor: new () => T) {
        let prefabName = FYUtility.getPrefabName(Ctor);
        let clsName = prefabName.substring(9);
        this.releaseEntityByName(clsName);
    }

    /**
     * 释放Entity
     * @param clsName Entity的类名
     */
    public releaseEntityByName(clsName: string) {
        let prefabName = `P_Entity_${clsName}`;
        FYLog.print(`Release entity ${clsName}`, FYLogEnum.Color.Green);

        this.resource.release<Prefab>(prefabName);
    }
}