import { BufferAsset } from "cc";
import { FY } from "../../FYFramework/Base/FY";
import { Pako } from "../../FYFramework/Lib/pako/Pako";
import FYLog from "../../FYFramework/Log/FYLog";
import JsonHPack from "../../FYFramework/Lib/JsonHPack";

export class CfgGameData {
    private static _dictInfo: CfgGameDataInfo[];
    /** 关键字名字 */
    private static _keyName: string = '';
    /** 指定关键字作为key */
    private static _dictInfoKeyName: { [key: string | number]: CfgGameDataInfo };
    /** 根据指定关键字归类信息数组 */
    private static _dictInfosKeyName: { [key: string | number]: CfgGameDataInfo[] };

    public static async getData(): Promise<CfgGameDataInfo[]>;
    public static async getData(keyName: string): Promise<{ [key: string | number]: CfgGameDataInfo }>;
    public static async getData(keyName?: string): Promise<CfgGameDataInfo[] | { [key: string | number]: CfgGameDataInfo }> {
        if (!CfgGameData._dictInfo) {
            let json: any = (await FY.resource.load<BufferAsset>('CFG_GameData')).buffer();
            CfgGameData._dictInfo = JsonHPack.hUnpack(JSON.parse(Pako.inflate(json, { to: "string" })));
        }

        if (keyName && keyName.length > 0) {
            if (keyName != this._keyName || !CfgGameData._dictInfoKeyName) {
                CfgGameData._dictInfoKeyName = {};
                this._keyName = keyName;
                for (let i = 0; i < CfgGameData._dictInfo.length; i++) {
                    let element = CfgGameData._dictInfo[i];
                    if (element[keyName] != null) {
                        CfgGameData._dictInfoKeyName[element[keyName]] = element;
                    } else {
                        FYLog.error(`CfgGameData._dictInfo index = ${i} 找不到 keyName = ${keyName}`);
                        return null;
                    }
                }
            }
            return CfgGameData._dictInfoKeyName;
        }

        return CfgGameData._dictInfo;
    }

    /**
     * 根据指定关键字归类信息数组
     * 这个方法适用于Key对应的行不唯一的情况
     * @param keyName 关键字
     * @returns 
     */
    public static async getDatas(keyName: string): Promise<{ [key: string | number]: CfgGameDataInfo[] }> {
        if (!CfgGameData._dictInfo) {
            let json: any = (await FY.resource.load<BufferAsset>('CFG_GameData')).buffer();
            CfgGameData._dictInfo = JsonHPack.hUnpack(JSON.parse(Pako.inflate(json, { to: "string" })));
        }

        if (keyName && keyName.length > 0) {
            if (keyName != this._keyName || !CfgGameData._dictInfosKeyName) {
                CfgGameData._dictInfosKeyName = {};
                this._keyName = keyName;
                for (let i = 0; i < CfgGameData._dictInfo.length; i++) {
                    let element = CfgGameData._dictInfo[i];
                    if (element[keyName] != null) {
                        if (CfgGameData._dictInfosKeyName[element[keyName]] == null) {
                            CfgGameData._dictInfosKeyName[element[keyName]] = [];
                        }
                        CfgGameData._dictInfosKeyName[element[keyName]].push(element);
                    } else {
                        FYLog.error(`CfgGameData._dictInfo index = ${i} 找不到 keyName = ${keyName}`);
                        return null;
                    }
                }
            }
            return CfgGameData._dictInfosKeyName;
        }
        FYLog.error(`CfgGameData._dictInfo 的 keyName 为空`);
        return null;
    }
}

export interface CfgGameDataInfo {
	/**
	 * 编号
	 * (
	 *   1：特殊编号
	 * )
	 */
	ID: number;
	/**
	 * 名字
	 */
	Name: string;
	/**
	 * 描述
	 */
	Desc: string;

}

