import { StateTypes, StoreManagementAdapter, WebStorageUnityType } from "../appTypes";
export default class WebStorageAdapter implements StoreManagementAdapter {
    protected storage: Storage;
    protected static stringifyValue(value: number | string | boolean): string;
    protected static stringifyValues(value: StateTypes): string;
    constructor(unityName: WebStorageUnityType);
    getItem(key: string): any;
    setItem(key: string, value: StateTypes): void;
}
