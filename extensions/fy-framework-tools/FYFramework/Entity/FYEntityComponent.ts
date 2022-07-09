
import { _decorator, Node } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { FYEntityModule } from './FYEntityModule';
import { FYEntityControllerBase } from './FYEntityControllerBase';
import { FYEnum } from '../Define/FYEnum';
const { ccclass, menu } = _decorator;

/**
 * UI组件
 */

@ccclass('FYEntityComponent')
@menu('FY/FYEntityComponent')
export class FYEntityComponent extends FYComponent {
    private _entity: FYEntityModule;
    /** UI模块 */
    private get entity(): FYEntityModule {
        if (!this._entity) {
            this._entity = FYEntry.getModule(FYEntityModule);
        }

        return this._entity
    }

    onLoad() {
        super.onLoad();
    }

    /**
     * 获取Entity
     * @param Ctor Entity的类
     * @param parent 父对象
     * @param cacheType 是否需要缓存，资源缓存类型
     * @returns 
     */
    public async getEntity<T extends FYEntityControllerBase>(Ctor: new () => T, parent: Node, cacheType: FYEnum.ResourceCacheType = FYEnum.ResourceCacheType.None): Promise<T> {
        return this.entity.getEntity<T>(Ctor, parent, cacheType);
    }

    /**
     * 获取Entity
     * @param clsName 类名
     * @param parent 父对象
     * @param cacheType 是否需要缓存，资源缓存类型
     * @returns 
     */
    public async getEntityByName<T extends FYEntityControllerBase>(clsName: string, parent: Node, cacheType: FYEnum.ResourceCacheType = FYEnum.ResourceCacheType.None): Promise<T> {
        return this.entity.getEntityByName(clsName, parent, cacheType);
    }

    /**
     * 实例化Entity
     * @param Ctor Entity的类
     * @param sample 要实例化的对象
     * @param parent 父对象
     * @returns 
     */
    public instantiateEntity<T extends FYEntityControllerBase>(Ctor: new () => T, sample: Node, parent: Node): T {
        return this.entity.instantiateEntity(Ctor, sample, parent);
    }

    /**
     * 释放Entity
     * @param Ctor Entity的类
     */
    public releaseEntity<T extends FYEntityControllerBase>(Ctor: new () => T) {
        this.entity.releaseEntity<T>(Ctor);
    }

    /**
     * 释放Entity
     * @param clsName Entity的类名
     */
    public realeaseEntityByName(clsName: string) {
        this.entity.realeaseEntityByName(clsName);
    }
}