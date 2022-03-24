"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Const {
}
exports.default = Const;
/**
 * 临时文件路径
 */
Const.TEMP_PATH = Editor.Project.path + '/temp';
/**
 * 该插件的临时文件路径
 */
Const.TEMP_DATA_PATH = Const.TEMP_PATH + '/fy-excel-tools';
/**
 * 该插件的临时文件
 */
Const.TEMP_DATA_FILE = Const.TEMP_DATA_PATH + '/data.json';
/**
 * 配置表路径
 */
Const.KEY_CONFIG_PATH = 'ConfigPath';
/**
 * 数据路径
 */
Const.KEY_DATA_PATH = 'DataPath';
/** 脚本路径 */
Const.KEY_SCRIPT_PATH = 'ScriptPath';
/**
 * Json文件前缀
 */
Const.JSON_NAME_PRE = 'CFG_';
/** 脚本模板路径 */
Const.TEMPLATE_PATH = Editor.Project.path + '/extensions/fy-excel-tools/template';
/** 脚本模板名 */
Const.TEMPLATE_NAME = 'CfgTemplate.txt';
/** 脚本模板关键字 */
Const.TEMPLATE_KEY = '$CONFIG_NAME';
/** 脚本模板参数关键字 */
Const.TEMPLATE_KEY_PARAMS = '$CONFIG_PARAMS';
