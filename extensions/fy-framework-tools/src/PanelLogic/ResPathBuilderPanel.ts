import Const from "../Const";
import Utility from "../Utility";
import fs from 'fs';
import pako from "../../lib/pako/pako";
import ResPathBuilderConst from "./ResPathBuilderConst";

export default class ResPathBuilderPanel {
    public static init(...params: any[]) {
        let btnGenResPath = params[0];
        let pgGenResPath = params[1];
        let btnLoadResPath = params[2];

        if (!btnGenResPath && !pgGenResPath && !btnLoadResPath) {
            console.error('btnGenResPath is null or pgGenResPath is null or btnLoadResPath is null');
            return;
        }

        pgGenResPath.message = '未开始构建';

        if (!fs.existsSync(Const.ROOT_RES_PATH)) {
            pgGenResPath.message = '没有找到resources目录';
            return;
        }

        btnGenResPath.addEventListener('confirm', () => {
            this.genResPath(btnGenResPath, pgGenResPath, btnLoadResPath);
        });

        btnLoadResPath.addEventListener('confirm', () => {
            this.loadResPath(btnGenResPath, pgGenResPath, btnLoadResPath);
        });
    }

    private static async genResPath(...params: any[]) {
        let btnGenResPath = params[0];
        let pgGenResPath = params[1];
        let btnLoadResPath = params[2];

        if (!btnGenResPath && !pgGenResPath && !btnLoadResPath) {
            console.error('btnGenResPath is null or pgGenResPath is null or btnLoadResPath is null');
            return;
        }

        pgGenResPath.message = '构建中';
        pgGenResPath.value = 1;
        btnGenResPath.setAttribute('disabled', '');
        btnLoadResPath.setAttribute('disabled', '');

        // 文件字典 key 文件名不含扩展名 value 文件在resources下的路径
        let fileDict: { [key: string]: string } = {};
        let fileNames = Utility.readFileList(Const.ROOT_RES_PATH, []);

        for (let i = 0; i < fileNames.length; i++) {
            // 统一文件路径分隔符，资源加载api用的/分隔符，windows路径用的\分隔符
            let element = fileNames[i].replace(new RegExp('\\\\', 'g'), '/');
            let splits = element.split('/');
            let fileName = splits[splits.length - 1];

            // 没有扩展名的文件名
            let fileNameNoExt = fileName.split('.')[0];
            let prefix = Editor.Project.path + "/assets/resources/";
            // 统一文件路径分隔符，资源加载api用的/分隔符，windows路径用的\分隔符
            prefix = prefix.replace(new RegExp('\\\\', 'g'), '/');
            // resources加载不能带后缀名
            let fileResPath = element.replace(prefix, "").split('.')[0];

            if (fileDict[fileNameNoExt] != null) {
                console.error(`资源名重复了，重复的资源：assets/resources/${fileResPath}`);
                return;
            }
            fileDict[fileNameNoExt] = fileResPath;
        }
        let json = JSON.stringify(fileDict);
        let compress = pako.deflate(json);

        // 校验目录，如果没有则创建
        Utility.checkDirectory(Const.ROOT_RES_PATH);

        let configPath = Const.ROOT_RES_PATH + '/' + ResPathBuilderConst.RES_PATH_CONFIG_NAME;
        // 让界面有时间刷新
        await new Promise(f => setTimeout(f, 1));
        // 写入文件
        fs.writeFileSync(configPath, compress);
        // 编辑器刷新 将新创建的资源导入
        Editor.Message.request('asset-db', 'refresh-asset', 'db://assets/resources/' + ResPathBuilderConst.RES_PATH_CONFIG_NAME);

        pgGenResPath.message = '构建完成';
        pgGenResPath.value = 100
        btnGenResPath.removeAttribute('disabled');
        btnLoadResPath.removeAttribute('disabled');

        console.log(`资源路径生成成功，文件：${configPath}`);
    }

    private static async loadResPath(...params: any[]) {
        let btnGenResPath = params[0];
        let pgGenResPath = params[1];
        let btnLoadResPath = params[2];

        if (!btnGenResPath && !pgGenResPath && !btnLoadResPath) {
            console.error('btnGenResPath is null or pgGenResPath is null or btnLoadResPath is null');
            return;
        }

        let configPath = Const.ROOT_RES_PATH + '/' + ResPathBuilderConst.RES_PATH_CONFIG_NAME;
        if (!fs.existsSync(configPath)) {
            let config: any = {
                title: '错误',
                detail: '资源路径配置文件不存在!',
                buttons: ['确定'],
            };
            Editor.Dialog.error('资源路径配置文件不存在!', config);
            console.error('资源路径配置文件不存在!');
            return;
        }

        pgGenResPath.message = '解析中';
        pgGenResPath.value = 1
        btnGenResPath.setAttribute('disabled', '');
        btnLoadResPath.setAttribute('disabled', '');

        // 让界面有时间刷新
        await new Promise(f => setTimeout(f, 1));
        let data = fs.readFileSync(configPath);

        let json = JSON.parse(pako.inflate(data, { to: 'string' }));

        pgGenResPath.message = '解析完成，看日志';
        pgGenResPath.value = 100
        btnGenResPath.removeAttribute('disabled');
        btnLoadResPath.removeAttribute('disabled');

        console.log(json);
    }
}