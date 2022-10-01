import {
  _decorator,
  CCInteger,
  RigidBody2D,
  PhysicsSystem2D,
  EventTouch,
  misc,
  Vec3,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

import { JoystickEvent, SpeedType } from "./Joystick";
import type { JoystickDataType } from "./Joystick";
import { FY } from "../../../FYFramework/Base/FY";
import { FYComponent } from "../../../FYFramework/Base/FYComponent";

PhysicsSystem2D.instance.enable = true;

@ccclass("JoystickPlayer")
export class JoystickPlayer extends FYComponent {
  @property({
    displayName: "刚体模式",
    tooltip: "不会立即停止",
  })
  rigidbody = false;

  // from joystick
  @property({
    displayName: "Move Dir",
    tooltip: "移动方向",
  })
  moveDir = new Vec3(0, 1, 0);

  @property({
    tooltip: "速度级别",
  })
  _speedType: SpeedType = SpeedType.STOP;

  // from self
  @property({
    type: CCInteger,
    tooltip: "移动速度",
  })
  _moveSpeed = 0;

  @property({
    type: CCInteger,
    tooltip: "停止时速度",
  })
  stopSpeed = 0;

  @property({
    type: CCInteger,
    tooltip: "正常速度",
  })
  normalSpeed = 100;

  @property({
    type: CCInteger,
    tooltip: "最快速度",
  })
  fastSpeed = 200;

  _body: RigidBody2D | null = null;

  onLoad() {
    if (this.rigidbody) {
      this._body = this.node.getComponent(RigidBody2D);
    }

    FY.event.on(JoystickEvent.TOUCH_START, this.onTouchStart, this);
    FY.event.on(JoystickEvent.TOUCH_MOVE, this.onTouchMove, this);
    FY.event.on(JoystickEvent.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart() { }

  onTouchMove(msgType: string, event: EventTouch, data: JoystickDataType) {
    this._speedType = data.speedType;
    this.moveDir = data.moveVec;

    this.onSetMoveSpeed(this._speedType);
  }

  onTouchEnd(msgType: string, event: EventTouch, data: JoystickDataType) {
    this._speedType = data.speedType;

    this.onSetMoveSpeed(this._speedType);
  }

  /**
   * set moveSpeed by SpeedType
   * @param speedType
   */
  onSetMoveSpeed(speedType: SpeedType) {
    switch (speedType) {
      case SpeedType.STOP:
        this._moveSpeed = this.stopSpeed;
        break;
      case SpeedType.NORMAL:
        this._moveSpeed = this.normalSpeed;
        break;
      case SpeedType.FAST:
        this._moveSpeed = this.fastSpeed;
        break;
      default:
        break;
    }
  }

  /**
   * 移动
   */
  move() {
    this.node.angle =
      misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;

    if (this.rigidbody && this._body) {
      const moveVec = this.moveDir.clone().multiplyScalar(this._moveSpeed / 20);
      const force = new Vec2(moveVec.x, moveVec.y);
      this._body.applyForceToCenter(force, true);
    } else {
      const oldPos = this.node.getPosition();
      const newPos = oldPos.add(
        // fps: 60
        this.moveDir.clone().multiplyScalar(this._moveSpeed / 60)
      );
      // console.log(this._moveSpeed / 60);
      this.node.setPosition(newPos);

      // console.log(newPos);
    }
  }

  update(deltaTime: number) {
    if (this._speedType !== SpeedType.STOP) {
      this.move();
    }
  }
}
