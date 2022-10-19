import { Button, Toggle, _decorator } from 'cc';
import { FYAudioAgentHelperBase } from '../../../FYFramework/Audio/FYAudioAgentHelperBase';
import { FY } from '../../../FYFramework/Base/FY';
import { FYEnum } from '../../../FYFramework/Define/FYEnum';
import { FYUIControllerBase } from '../../../FYFramework/UI/FYUIControllerBase';
import { GEnum } from '../../Define/GEnum';
import { UIAudioDemoModel } from './UIAudioDemoModel';
import { UIAudioDemoView } from './UIAudioDemoView';
const { ccclass, property } = _decorator;


@ccclass('UIAudioDemo')
export class UIAudioDemo extends FYUIControllerBase {
    /** 预制名 给类调用 */
    public static prefabName = 'P_UI_UIAudioDemo';
    /** 预制名 给实例调用 */
    public prefabName = 'P_UI_UIAudioDemo';

    public model: UIAudioDemoModel = undefined;
    public view: UIAudioDemoView = undefined;

    /** 音乐对象 */
    private _musicAgent: FYAudioAgentHelperBase = null;

    init() {
        this.view.cAudioToggle.isChecked = FY.storage.getNumber(GEnum.StorageType.MusicMute) === 0;
        this.view.cPlayToggle.isChecked = true;
    }

    addEvent() {
        this.on(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
        this.on(FYEnum.UIEvent.Toggle, this.onToggleClick, this);
    }

    removeEvent() {
        this.off(FYEnum.UIEvent.ButtonClick, this.onButtonClick, this);
        this.off(FYEnum.UIEvent.Toggle, this.onToggleClick, this);
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

        if (this._musicAgent) {
            FY.audio.stop(this._musicAgent.id);
        }
    }

    /**
    * 
    * @param eventType 事件类型
    * @param component 触发事件的组件
    */
    private async onButtonClick(eventType: string, component: Button) {
        // FYLog.log(`点击了 ${component.name}`);
        switch (component.name) {
            case this.view.cCloseButton.name:
                this.close();
                break;
            case this.view.cMaskButton.name:
                this.close();
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
            case this.view.cAudioToggle.name:
                FY.audio.getGroup(GEnum.AudioGroupType.Sound).mute = !this.view.cAudioToggle.isChecked;
                FY.audio.getGroup(GEnum.AudioGroupType.Music).mute = !this.view.cAudioToggle.isChecked;

                FY.storage.setNumber(GEnum.StorageType.SoundMute, this.view.cAudioToggle.isChecked ? 0 : 1);
                FY.storage.setNumber(GEnum.StorageType.MusicMute, this.view.cAudioToggle.isChecked ? 0 : 1);
                break;
            case this.view.cPlayToggle.name:
                if (!this.view.cPlayToggle.isChecked) {
                    this._musicAgent = await FY.audio.play(GEnum.Music.DemoBg, GEnum.AudioGroupType.Music, true);
                } else if (this._musicAgent) {
                    FY.audio.stop(this._musicAgent.id);
                }
                break;
            default:
                break;
        }
    }
}