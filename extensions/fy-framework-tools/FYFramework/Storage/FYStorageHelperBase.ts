/**
 * 存储辅助器基类
 */

export abstract class FYStorageHelperBase {
    /**
     * 数据数量
     */
    public abstract get count(): number;
    /**
     * 加载
     */
    public abstract load(): boolean;
    /**
     * 保存
     */
    public abstract save(): boolean;
    /**
     * 设置数值
     * @param key 关键字
     * @param value 数据
     */
    public abstract setNumber(key: string, value: number);
    /**
     * 获取数值
     * @param key 关键字
     * @param defaultValue 默认值
     */
    public abstract getNumber(key: string, defaultValue?: number): number;
    /**
     * 设置字符串
     * @param key 关键字
     * @param value 数据
     */
    public abstract setString(key: string, value: string);
    /**
     * 获取字符串
     * @param key 关键字
     * @param defaultValue 默认值
     */
    public abstract getString(key: string, defaultValue?: string): string;
    /**
     * 设置对象
     * @param key 关键字
     * @param value 数据
     */
    public abstract setObject(key: string, value: Object);
    /**
     * 获取对象
     * @param key 关键字
     * @param defaultValue 默认值
     */
    public abstract getObject(key: string, defaultValue?: Object): Object;
    /**
     * 移除
     * @param key 关键字
     */
    public abstract remove(key: string);
    /**
     * 清空
     */
    public abstract clear();

}