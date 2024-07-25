"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssistConst {
}
/** 工程ts配置文件 */
AssistConst.TSCONFIG_PATH = Editor.Project.path + '/tsconfig.json';
/** 项目类型定义文件路径 */
AssistConst.PROJ_TYPE_PATH = Editor.Project.path + '/@types';
/** 扩展类型定义文件路径 */
AssistConst.EXT_TYPE_PATH = Editor.Project.path + '/extensions/fy-framework-tools/@types-custom';
/** 项目类型定义文件版本 */
AssistConst.PROJ_TYPE_VERSION = AssistConst.PROJ_TYPE_PATH + '/Version.txt';
/** 扩展类型定义文件版本 */
AssistConst.EXT_TYPE_VERSION = AssistConst.EXT_TYPE_PATH + '/Version.txt';
exports.default = AssistConst;
