// This script is automatic generation, please do not edit.
// If you need add logic, please write in JoystickCtrlView.ts .
// If you need add data, please write in JoystickCtrlViewModel.ts .

import { _decorator, find, Node, UITransform, Widget } from 'cc';
import { FYEntityViewBase } from '../../../FYFramework/Entity/FYEntityViewBase';
import { Joystick } from '../../Component/Joystick/Joystick';

const { ccclass, property } = _decorator;


@ccclass('JoystickCtrlView')
export class JoystickCtrlView extends FYEntityViewBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_Entity_JoystickCtrl';
    /** 预制名 给实例调用 */
    public prefabName = 'P_Entity_JoystickCtrl';

    public cNode: Node;
    public cNodeUITransform: UITransform = undefined;
    public cNodeWidget: Widget = undefined;
    public cNodeJoystick: Joystick = undefined;
    

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
        this.cNodeWidget = this.cNode.getComponent(Widget);
        this.cNodeJoystick = this.cNode.getComponent(Joystick);
        
    }

    private addEvent() {

    }

    private removeEvent() {

    }


}