//@ts-ignore
import packageJSON from '../package.json';
import PrefabCodeBuilderPanel from './PanelLogic/PrefabCodeBuilderPanel';
/**
 * @en 
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    open_panel() {
        Editor.Panel.open(packageJSON.name);
    },
};


const onAssetChange = function (err: any, results: any) {
    // 如果 P_ 开头的预制发生了变化，则添加到文件中
    if (results && results['file'] && results['type'] === 'cc.Prefab' && results['name'] && results['name'].indexOf('P_') >= 0) {
        PrefabCodeBuilderPanel.addAssetChangeFlag(results['file']);
    }
}

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
 export const load = function () {
    Editor.Message.addBroadcastListener('asset-db:asset-change', onAssetChange);
};

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export const unload = function () {
    Editor.Message.removeBroadcastListener('asset-db:asset-change', onAssetChange);
};
