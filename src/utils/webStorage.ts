import { StoreManagementAdapter, WebStorageUnityType } from "../typings";

export default class WebStorageManager implements StoreManagementAdapter {
  protected storage: Storage;

  constructor(unityName: WebStorageUnityType) {
    if (unityName === "local") this.storage = window.localStorage;
    else this.storage = window.sessionStorage;
  }

  getItem(key: string) {
    return eval(this.storage.getItem(key) ?? "");
  }
}
