"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const AssistPanel_1 = __importDefault(require("../../../PanelLogic/AssistPanel"));
const ExamplePanel_1 = __importDefault(require("../../../PanelLogic/ExamplePanel"));
const InitFramePanel_1 = __importDefault(require("../../../PanelLogic/InitFramePanel"));
const PrefabCodeBuilderPanel_1 = __importDefault(require("../../../PanelLogic/PrefabCodeBuilderPanel"));
const ResPathBuilderPanel_1 = __importDefault(require("../../../PanelLogic/ResPathBuilderPanel"));
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../../static/template/default/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../../static/style/default/index.css'), 'utf-8'),
    $: {
        // 辅助
        btnExcludeExtensions: '#btnExcludeExtensions',
        labExcludeExtensions: '#labExcludeExtensions',
        labAddDts: '#labAddDts',
        btnAddDts: '#btnAddDts',
        // 初始化框架
        verExtensions: '#verExtensions',
        verProject: '#verProject',
        labInitTip: '#labInitTip',
        btnInit: '#btnInit',
        // 资源路径生成器
        btnGenResPath: '#btnGenResPath',
        pgGenResPath: '#pgGenResPath',
        btnLoadResPath: '#btnLoadResPath',
        // 预制脚本生成器
        btnGenPrefabCode: '#btnGenPrefabCode',
        pgGenPrefabCode: '#pgGenPrefabCode',
        // 样本项目
        btnInitExample: '#btnInitExample',
    },
    methods: {},
    ready() {
        // 辅助组件
        AssistPanel_1.default.init(this.$.btnExcludeExtensions, this.$.labExcludeExtensions, this.$.labAddDts, this.$.btnAddDts);
        // 初始化框架
        InitFramePanel_1.default.init(this.$.labInitTip, this.$.btnInit, this.$.verExtensions, this.$.verProject);
        // 资源路径生成工具
        ResPathBuilderPanel_1.default.init(this.$.btnGenResPath, this.$.pgGenResPath, this.$.btnLoadResPath);
        // 预制脚本生成工具
        PrefabCodeBuilderPanel_1.default.init(this.$.btnGenPrefabCode, this.$.pgGenPrefabCode);
        // 样本项目
        ExamplePanel_1.default.init(this.$.btnInitExample);
    },
    beforeClose() { },
    close() { },
});
