import { FYLocalizationHelperBase } from "./FYLocalizationHelperBase";
/**
 * 默认本地化辅助器
 */
export class DefaultLocalizationHelper extends FYLocalizationHelperBase {
    /**
     * 获取多语言文本
     * @param key 关键字
     */
    public async get(key: string): Promise<string> {
        return null;
    }

}