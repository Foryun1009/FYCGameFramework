"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Const_1 = __importDefault(require("../Const"));
class PrefabCodeBuilderConst {
}
exports.default = PrefabCodeBuilderConst;
/**
 * 预制路径
 */
PrefabCodeBuilderConst.PREFAB_PATH = Const_1.default.ROOT_RES_PATH + '/Prefab';
/**
 * UI路径
 */
PrefabCodeBuilderConst.UI_PATH = PrefabCodeBuilderConst.PREFAB_PATH + '/UI';
/**
 * 输出文件根目录
 */
PrefabCodeBuilderConst.ROOT_EXPORT_PATH = Editor.Project.path + '/assets/Script';
/**
 * UI脚本路径
 */
PrefabCodeBuilderConst.UI_SCRIPT_PATH = PrefabCodeBuilderConst.ROOT_EXPORT_PATH + '/UI';
/**
 * 扩展路径
 */
PrefabCodeBuilderConst.EXTENSIONS_PATH = Editor.Project.path + '/extensions';
/**
 * 模板路径
 */
PrefabCodeBuilderConst.TEMPLATE_PATH = PrefabCodeBuilderConst.EXTENSIONS_PATH + '/fy-framework-tools/template';
/**
 * 模板配置
 */
PrefabCodeBuilderConst.TEMPLATE_FILE_CONFIG = {
    'UI': {
        'Model': 'ModelTemplate.txt',
        'View': 'ViewTemplate.txt',
        'Controller': 'ControllerTemplate.txt',
    },
    'Entity': {
        'Model': 'EntityModelTemplate.txt',
        'View': 'EntityViewTemplate.txt',
        'Controller': 'EntityControllerTemplate.txt',
    }
};
/**
 * 组件事件配置表
 */
PrefabCodeBuilderConst.COMPONENT_EVENT_CONFIG = {
    'Button': [{
            'EventName': 'click',
            'FunctionName': 'Click',
        }],
    'EditBox': [{
            'EventName': 'editing-did-began',
            'FunctionName': 'EditingBegan',
        }, {
            'EventName': 'editing-did-ended',
            'FunctionName': 'EditingEnded',
        }, {
            'EventName': 'editing-return',
            'FunctionName': 'EditingReturn',
        }, {
            'EventName': 'text-changed',
            'FunctionName': 'TextChanged',
        }],
    'ScrollView': [{
            'EventName': 'scroll-to-top',
            'FunctionName': 'ScrollToTop',
        }, {
            'EventName': 'scroll-to-bottom',
            'FunctionName': 'ScrollToBottom',
        }, {
            'EventName': 'scroll-to-left',
            'FunctionName': 'ScrollToLeft',
        }, {
            'EventName': 'scroll-to-right',
            'FunctionName': 'ScrollToRight',
        }, {
            'EventName': 'scrolling',
            'FunctionName': 'Scrolling',
        }, {
            'EventName': 'bounce-bottom',
            'FunctionName': 'BounceBottom',
        }, {
            'EventName': 'bounce-top',
            'FunctionName': 'BounceTop',
        }, {
            'EventName': 'bounce-left',
            'FunctionName': 'BounceLeft',
        }, {
            'EventName': 'bounce-right',
            'FunctionName': 'BounceRight',
        }, {
            'EventName': 'scroll-ended',
            'FunctionName': 'ScrollEnded',
        }, {
            'EventName': 'touch-up',
            'FunctionName': 'TouchUp',
        }, {
            'EventName': 'scroll-began',
            'FunctionName': 'ScrollBegan',
        }],
    'Toggle': [{
            'EventName': 'toggle',
            'FunctionName': 'Toggle',
        }],
    'Slider': [{
            'EventName': 'slide',
            'FunctionName': 'Slide',
        }],
    'PageView': [{
            'EventName': 'page-turning',
            'FunctionName': 'PageTurning',
        }]
};
/**
 * 临时文件路径
 */
PrefabCodeBuilderConst.TEMP_PATH = Editor.Project.path + '/temp';
/**
 * 该插件的临时文件路径
 */
PrefabCodeBuilderConst.TEMP_DATA_PATH = PrefabCodeBuilderConst.TEMP_PATH + '/fy-framework-tools';
/**
 * 该插件的临时文件
 */
PrefabCodeBuilderConst.TEMP_DATA_FILE = PrefabCodeBuilderConst.TEMP_DATA_PATH + '/asset-change-flag.json';
/**
 * 模板 视图 导入关键字
 */
PrefabCodeBuilderConst.VIEW_KEY_IMPORT = '$IMPORT';
/**
 * 模板 视图 类名
 */
PrefabCodeBuilderConst.VIEW_KEY_CLASS_NAME = '$CLASS_NAME';
/**
 * 模板 视图 变量声明
 */
PrefabCodeBuilderConst.VIEW_KEY_VARIABLE_DECLARATIONS = '$VARIABLE_DECLARATIONS';
/**
 * 模板 视图 变量赋值
 */
PrefabCodeBuilderConst.VIEW_KEY_VARIABLE_ASSIGNMENT = '$VARIABLE_ASSIGNMENT';
/**
 * 目标 视图 预制名
 */
PrefabCodeBuilderConst.VIEW_KEY_PREFAB_NAME = '$PREFAB_NAME';
/**
 * 模板 视图 事件添加
 */
PrefabCodeBuilderConst.VIEW_KEY_EVENT_ON = '$EVENT_ON';
/**
 * 模板 视图 事件移除
 */
PrefabCodeBuilderConst.VIEW_KEY_EVENT_OFF = '$EVENT_OFF';
/**
 * 模板 视图 事件回调
 */
PrefabCodeBuilderConst.VIEW_KEY_EVENT_CALLBACK = '$EVENT_CALLBACK';
