import { _decorator } from 'cc';
import { FYUIModelBase } from '../../../FYFramework/UI/FYUIModelBase';
const { ccclass, property } = _decorator;


@ccclass('UIDiamondChangeDemoModel')
export class UIDiamondChangeDemoModel extends FYUIModelBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIDiamondChangeDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIDiamondChangeDemo';
}