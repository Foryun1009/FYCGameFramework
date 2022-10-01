import { _decorator } from 'cc';
import { FYEntityModelBase } from '../../../FYFramework/Entity/FYEntityModelBase';
const { ccclass, property } = _decorator;


@ccclass('JoystickCtrlModel')
export class JoystickCtrlModel extends FYEntityModelBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_JoystickCtrl';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_JoystickCtrl';
}