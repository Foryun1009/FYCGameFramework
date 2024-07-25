
import { _decorator } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { DefaultLocalizationHelper } from './DefaultLocalizationHelper';
import { FYLocalizationHelperBase } from './FYLocalizationHelperBase';
import { FYEntry } from '../Base/FYEntry';
import { FYLocalizationModule } from './FYLocalizationModule';
const { ccclass, menu } = _decorator;

/**
 * 本地化组件
 */
@ccclass('FYLocalizationComponent')
@menu('FY/FYLocalizationComponent')
export class FYLocalizationComponent extends FYComponent {
    private _localization: FYLocalizationModule;
    /** 本地化模块 */
    public get localization(): FYLocalizationModule {
        if (!this._localization) {
            this._localization = FYEntry.getModule(FYLocalizationModule);
        }

        return this._localization
    }

    onLoad() {
        super.onLoad();
        this.setHelper(new DefaultLocalizationHelper());
    }

    public setHelper(helper: FYLocalizationHelperBase) {
        this.localization.setHelper(helper);
    }

    /**
     * 获取多语言文本
     * @param key 关键字
     */
    public async get(key: string): Promise<string> {
        return await this.localization?.get(key);
    }
}