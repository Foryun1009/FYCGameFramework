/**
 * 本地化辅助器基类
 */

export abstract class FYLocalizationHelperBase {
    /**
     * 获取多语言文本
     * @param key 关键字
     */
    public abstract get(key: string): Promise<string>;
}