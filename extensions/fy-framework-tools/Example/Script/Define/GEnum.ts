export module GEnum {
    export enum GameType {

    }

    export enum GameMode {

    }

    export enum StorageType {
        /** 用户信息 */
        UserInfo = 'UserInfo',
        /** 游戏数据 */
        GameData = 'GameData',
        /** 音效静音 */
        SoundMute = 'SoundMute',
        /** 音乐静音 */
        MusicMute = 'MusicMute',
        /** 震动开关 */
        Vibrate = 'Vibrate',
        /** 钻石 */
        Diamond = 'Diamond',
    }

    export enum GameEvent {
        /** 重来一次 */
        Again = 'Again',
        /** 复活 */
        Revive = 'Revive',
        /** 操作UI 为了解决UI的循环引用问题 */
        OperateUI = 'OperateUI',
        /** 钻石数量发生了变化 */
        DiamondNumChanged = 'DiamondNumChanged',
        /** 提示Item动画播放完毕 */
        UITipsItemTweenComplete = 'UITipsItemTweenComplete',
    }

    export enum MessageBoxType {
        /** 一个按钮 */
        ButtonOne = 'ButtonOne',
        /** 两个按钮 */
        ButtonTwo = 'ButtonTwo',
        /** 三个按钮 */
        ButtonThree = 'ButtonThree',
    }

    export enum AudioGroupType {
        /** 音乐 */
        Music = 'Music',
        /** 声音 */
        Sound = 'Sound',
    }
}