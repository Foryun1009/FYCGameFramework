import { _decorator } from 'cc';
import { FYEntityControllerBase } from '../../../FYFramework/Entity/FYEntityControllerBase';
import { RoleModel } from './RoleModel';
import { RoleView } from './RoleView';
const { ccclass, property } = _decorator;


@ccclass('Role')
export class Role extends FYEntityControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_Role';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_Role';

    public model: RoleModel = undefined;
    public view: RoleView = undefined;

}