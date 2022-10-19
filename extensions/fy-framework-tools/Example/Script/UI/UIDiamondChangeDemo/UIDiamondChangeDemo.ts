import { Button, Toggle, _decorator } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { GEnum } from '../../Define/GEnum';
import Session from '../../Session/Session';
import { UIMenu } from '../UIMenu/UIMenu';
import { UIDiamondChangeDemoModel } from './UIDiamondChangeDemoModel';
import { UIDiamondChangeDemoView } from './UIDiamondChangeDemoView';
const { ccclass, property } = _decorator;


@ccclass('UIDiamondChangeDemo')
export class UIDiamondChangeDemo extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIDiamondChangeDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIDiamondChangeDemo';

    public model: UIDiamondChangeDemoModel = undefined;
    public view: UIDiamondChangeDemoView = undefined;

    init() {
        this.view.cDiamondNumLabel.string = Session.diamond.toString();
        this.view.cAutoDiamondToggle.isChecked = false;
    }

    addEvent() {
        this.on(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
        this.on(FYEnum.UIEvent.Toggle, this.onToggleClick, this);

        FY.event.on(GEnum.GameEvent.DiamondNumChanged, this.onDiamondChange, this);
    }

    removeEvent() {
        this.off(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
        this.off(FYEnum.UIEvent.Toggle, this.onToggleClick, this);

        FY.event.off(GEnum.GameEvent.DiamondNumChanged, this.onDiamondChange, this);

        FY.timer.remove(GEnum.TimerKey.AutoDiamond);
    }

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.addEvent();

        this.init();
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.removeEvent();


    }

    /**
    * 
    * @param eventType 事件类型
    * @param component 触发事件的组件
    */
    private async onButtonClick(eventType: string, component: Button) {
        // FYLog.log(`点击了 ${component.name}`);
        switch (component.name) {
            case this.view.cShowUIMenuButton.name:
                await FY.ui.open(UIMenu);
                this.close();
                break;
            case this.view.cAddDiamondButton.name:
                Session.diamond++;
                break;
            case this.view.cReduceDiamondButton.name:
                Session.diamond--;
                break;
            default:
                break;
        }
    }

    /**
    * 
    * @param eventType 事件类型
    * @param component 触发事件的组件
    */
    private async onToggleClick(eventType: string, component: Toggle) {
        switch (component.name) {
            case this.view.cAutoDiamondToggle.name:
                if (this.view.cAutoDiamondToggle.isChecked) {
                    FY.timer.add(GEnum.TimerKey.AutoDiamond, -1, 1, (isCountDownComplete: boolean, curTime: number) => {
                        Session.diamond++;
                    });
                } else {
                    FY.timer.remove(GEnum.TimerKey.AutoDiamond);
                }
                break;
            default:
                break;
        }
    }

    private onDiamondChange(eventType: string, diamond: number) {
        this.view.cDiamondNumLabel.string = diamond.toString();
    }
}