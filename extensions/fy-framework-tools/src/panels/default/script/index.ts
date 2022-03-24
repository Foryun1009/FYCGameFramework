import { readFileSync } from 'fs-extra';
import { join } from 'path';
import AssistPanel from '../../../PanelLogic/AssistPanel';
import ExamplePanel from '../../../PanelLogic/ExamplePanel';
import InitFramePanel from '../../../PanelLogic/InitFramePanel';
import PrefabCodeBuilderPanel from '../../../PanelLogic/PrefabCodeBuilderPanel';
import ResPathBuilderPanel from '../../../PanelLogic/ResPathBuilderPanel';

module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../../static/template/default/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../../static/style/default/index.css'), 'utf-8'),
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
    methods: {
    },
    ready() {
        // 辅助组件
        AssistPanel.init(this.$.btnExcludeExtensions, this.$.labExcludeExtensions, this.$.labAddDts, this.$.btnAddDts);
        // 初始化框架
        InitFramePanel.init(this.$.labInitTip, this.$.btnInit, this.$.verExtensions, this.$.verProject);
        // 资源路径生成工具
        ResPathBuilderPanel.init(this.$.btnGenResPath, this.$.pgGenResPath, this.$.btnLoadResPath);
        // 预制脚本生成工具
        PrefabCodeBuilderPanel.init(this.$.btnGenPrefabCode, this.$.pgGenPrefabCode); 
        // 样本项目
        ExamplePanel.init(this.$.btnInitExample);
    },
    beforeClose() { },
    close() { },
});
