import { StateTypes, StoreManagementAdapter, WebStorageUnityType } from "../typings";
export default class WebStorageAdapter implements StoreManagementAdapter {
    protected storage: Storage;
    protected static stringifyValues(value: StateTypes): string;
    constructor(unityName: WebStorageUnityType);
    getItem(key: string): any;
    setItem(key: string, value: StateTypes): void;
}
