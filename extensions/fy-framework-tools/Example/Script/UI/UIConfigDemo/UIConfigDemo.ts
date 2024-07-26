import { Button, _decorator } from 'cc';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { CfgGameData } from '../../Config/CfgGameData';
import { UIMenu } from '../UIMenu/UIMenu';
import { UIConfigDemoModel } from './UIConfigDemoModel';
import { UIConfigDemoView } from './UIConfigDemoView';
const { ccclass, property } = _decorator;


@ccclass('UIConfigDemo')
export class UIConfigDemo extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIConfigDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIConfigDemo';

    public model: UIConfigDemoModel = undefined;
    public view: UIConfigDemoView = undefined;

    addEvent() {
        this.on(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    removeEvent() {
        this.off(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
    }

    async init() {
        // 按照配置表的行数获取
        let desc = (await CfgGameData.getData())[0].Desc;
        // 按照指定关键字的值获取
        let name = (await CfgGameData.getData('ID'))[2].Name;

        this.view.cLogLabel.string = `配置表GameData\n\n第1行的Desc = ${desc}\n\n关键字ID=2的Name = ${name}`;
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
            default:
                break;
        }
    }
}