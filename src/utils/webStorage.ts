import {
  StateTypes,
  StoreManagementAdapter,
  WebStorageUnityType,
} from "../typings";

export default class WebStorageManager implements StoreManagementAdapter {
  protected storage: Storage;

  protected static stringifyValues(value: StateTypes) {
    if (!value) return `${value}`;

    if (typeof value === "object") {
      const first = value.at(0);
      if (first && typeof first !== "string") {
        return `[${value.toString()}]`;
      } else return `[${value.map((value) => `"${value}"`).toString()}]`;
    }

    return value.toString();
  }

  constructor(unityName: WebStorageUnityType) {
    if (unityName === "local") this.storage = window.localStorage;
    else this.storage = window.sessionStorage;
  }

  getItem(key: string) {
    return eval(this.storage.getItem(key) ?? "");
  }
}
