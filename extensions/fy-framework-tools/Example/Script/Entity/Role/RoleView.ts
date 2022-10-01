// This script is automatic generation, please do not edit.
// If you need add logic, please write in RoleView.ts .
// If you need add data, please write in RoleViewModel.ts .

import { _decorator, find, Node, UITransform } from 'cc';
import { FYEntityViewBase } from '../../../FYFramework/Entity/FYEntityViewBase';
import { JoystickPlayer } from '../../Component/Joystick/JoystickPlayer';

const { ccclass, property } = _decorator;


@ccclass('RoleView')
export class RoleView extends FYEntityViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_Role';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_Role';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeJoystickPlayer: JoystickPlayer = undefined;
    

    public onLoad() {
        this.initComponent();
    }

    public onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.addEvent();
    }

    public onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.removeEvent();
    } 

    private initComponent() {
        this.cNode = this.node;
        this.cNodeUITransform = this.cNode.getComponent(UITransform);
        this.cNodeJoystickPlayer = this.cNode.getComponent(JoystickPlayer);
        
    }

    private addEvent() {

    }

    private removeEvent() {

    }


}