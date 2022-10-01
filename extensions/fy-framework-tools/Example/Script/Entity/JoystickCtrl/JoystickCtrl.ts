import { _decorator } from 'cc';
import { FYEntityControllerBase } from '../../../FYFramework/Entity/FYEntityControllerBase';
import { JoystickCtrlModel } from './JoystickCtrlModel';
import { JoystickCtrlView } from './JoystickCtrlView';
const { ccclass, property } = _decorator;


@ccclass('JoystickCtrl')
export class JoystickCtrl extends FYEntityControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_JoystickCtrl';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_JoystickCtrl';

    public model: JoystickCtrlModel = undefined;
    public view: JoystickCtrlView = undefined;

}