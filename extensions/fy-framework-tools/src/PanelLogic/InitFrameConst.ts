export default class InitFrameConst {
    /** 框架目录 */
    public static readonly FY_FRAMEWORK_PATH = Editor.Project.path + '/assets/FYFramework';
    /** 框架版本号文件路径 */
    public static readonly FY_FRAMEWORK_VERSION_PATH = InitFrameConst.FY_FRAMEWORK_PATH + '/Version.txt';
    /** 插件中的框架目录 */
    public static readonly FY_FRAMEWORK_EXTENSIONS_PATH = Editor.Project.path + '/extensions/fy-framework-tools/FYFramework';
    /** 插件中的框架版本号 */
    public static readonly FY_FRAMEWORK_EXTENSIONS_VERSION_PATH = InitFrameConst.FY_FRAMEWORK_EXTENSIONS_PATH + '/Version.txt';
}