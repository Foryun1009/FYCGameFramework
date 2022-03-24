"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
//@ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
const PrefabCodeBuilderPanel_1 = __importDefault(require("./PanelLogic/PrefabCodeBuilderPanel"));
/**
 * @en
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    open_panel() {
        Editor.Panel.open(package_json_1.default.name);
    },
};
const onAssetChange = function (err, results) {
    // 如果 P_ 开头的预制发生了变化，则添加到文件中
    if (results && results['file'] && results['type'] === 'cc.Prefab' && results['name'] && results['name'].indexOf('P_') >= 0) {
        PrefabCodeBuilderPanel_1.default.addAssetChangeFlag(results['file']);
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
const load = function () {
    Editor.Message.addBroadcastListener('asset-db:asset-change', onAssetChange);
};
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
const unload = function () {
    Editor.Message.removeBroadcastListener('asset-db:asset-change', onAssetChange);
};
exports.unload = unload;
