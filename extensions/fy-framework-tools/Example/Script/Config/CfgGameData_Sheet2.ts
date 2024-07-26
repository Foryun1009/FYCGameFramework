import { BufferAsset } from "cc";
import { FY } from "../../FYFramework/Base/FY";
import { Pako } from "../../FYFramework/Lib/pako/Pako";
import FYLog from "../../FYFramework/Log/FYLog";
import JsonHPack from "../../FYFramework/Lib/JsonHPack";

export class CfgGameData_Sheet2 {
    private static _dictInfo: CfgGameData_Sheet2Info[];
    /** 关键字名字 */
    private static _keyName: string = '';
    /** 指定关键字作为key */
    private static _dictInfoKeyName: { [key: string | number]: CfgGameData_Sheet2Info };
    /** 根据指定关键字归类信息数组 */
    private static _dictInfosKeyName: { [key: string | number]: CfgGameData_Sheet2Info[] };

    public static async getData(): Promise<CfgGameData_Sheet2Info[]>;
    public static async getData(keyName: string): Promise<{ [key: string | number]: CfgGameData_Sheet2Info }>;
    public static async getData(keyName?: string): Promise<CfgGameData_Sheet2Info[] | { [key: string | number]: CfgGameData_Sheet2Info }> {
        if (!CfgGameData_Sheet2._dictInfo) {
            let json: any = (await FY.resource.load<BufferAsset>('CFG_GameData_Sheet2')).buffer();
            CfgGameData_Sheet2._dictInfo = JsonHPack.hUnpack(JSON.parse(Pako.inflate(json, { to: "string" })));
        }

        if (keyName && keyName.length > 0) {
            if (keyName != this._keyName || !CfgGameData_Sheet2._dictInfoKeyName) {
                CfgGameData_Sheet2._dictInfoKeyName = {};
                this._keyName = keyName;
                for (let i = 0; i < CfgGameData_Sheet2._dictInfo.length; i++) {
                    let element = CfgGameData_Sheet2._dictInfo[i];
                    if (element[keyName] != null) {
                        CfgGameData_Sheet2._dictInfoKeyName[element[keyName]] = element;
                    } else {
                        FYLog.error(`CfgGameData_Sheet2._dictInfo index = ${i} 找不到 keyName = ${keyName}`);
                        return null;
                    }
                }
            }
            return CfgGameData_Sheet2._dictInfoKeyName;
        }

        return CfgGameData_Sheet2._dictInfo;
    }

    /**
     * 根据指定关键字归类信息数组
     * 这个方法适用于Key对应的行不唯一的情况
     * @param keyName 关键字
     * @returns 
     */
    public static async getDatas(keyName: string): Promise<{ [key: string | number]: CfgGameData_Sheet2Info[] }> {
        if (!CfgGameData_Sheet2._dictInfo) {
            let json: any = (await FY.resource.load<BufferAsset>('CFG_GameData_Sheet2')).buffer();
            CfgGameData_Sheet2._dictInfo = JsonHPack.hUnpack(JSON.parse(Pako.inflate(json, { to: "string" })));
        }

        if (keyName && keyName.length > 0) {
            if (keyName != this._keyName || !CfgGameData_Sheet2._dictInfosKeyName) {
                CfgGameData_Sheet2._dictInfosKeyName = {};
                this._keyName = keyName;
                for (let i = 0; i < CfgGameData_Sheet2._dictInfo.length; i++) {
                    let element = CfgGameData_Sheet2._dictInfo[i];
                    if (element[keyName] != null) {
                        if (CfgGameData_Sheet2._dictInfosKeyName[element[keyName]] == null) {
                            CfgGameData_Sheet2._dictInfosKeyName[element[keyName]] = [];
                        }
                        CfgGameData_Sheet2._dictInfosKeyName[element[keyName]].push(element);
                    } else {
                        FYLog.error(`CfgGameData_Sheet2._dictInfo index = ${i} 找不到 keyName = ${keyName}`);
                        return null;
                    }
                }
            }
            return CfgGameData_Sheet2._dictInfosKeyName;
        }
        FYLog.error(`CfgGameData_Sheet2._dictInfo 的 keyName 为空`);
        return null;
    }
}

export interface CfgGameData_Sheet2Info {
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

}

