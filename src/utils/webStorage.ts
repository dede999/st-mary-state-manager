import {
  StateTypes,
  StoreManagementAdapter,
  WebStorageUnityType,
} from "../typings";

export default class WebStorageAdapter implements StoreManagementAdapter {
  protected storage: Storage;

  protected static stringifyValue(value: number | string | boolean) {
    return typeof value === "string" ? `"${value}"` : value.toString();
  }

  protected static stringifyValues(value: StateTypes) {
    if (!value) return `${value}`;

    if (typeof value === "object") {
      return `[${value.map(this.stringifyValue)}]`;
    }

    return this.stringifyValue(value);
  }

  constructor(unityName: WebStorageUnityType) {
    if (unityName === "local") this.storage = window.localStorage;
    else this.storage = window.sessionStorage;
  }

  getItem(key: string) {
    return eval(this.storage.getItem(key) ?? "");
  }

  setItem(key: string, value: StateTypes) {
    this.storage.setItem(key, WebStorageAdapter.stringifyValues(value));
  }
}
