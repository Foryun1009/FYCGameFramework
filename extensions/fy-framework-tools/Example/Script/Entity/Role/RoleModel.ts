import { _decorator } from 'cc';
import { FYEntityModelBase } from '../../../FYFramework/Entity/FYEntityModelBase';
const { ccclass, property } = _decorator;


@ccclass('RoleModel')
export class RoleModel extends FYEntityModelBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_Role';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_Role';
}