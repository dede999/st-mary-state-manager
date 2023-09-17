"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebStorageAdapter {
    static stringifyValues(value) {
        if (!value)
            return `${value}`;
        if (typeof value === "object") {
            const first = value.at(0);
            if (first && typeof first !== "string") {
                return `[${value.toString()}]`;
            }
            else
                return `[${value.map((value) => `"${value}"`).toString()}]`;
        }
        return typeof value === "string" ? `"${value}"` : value.toString();
    }
    constructor(unityName) {
        if (unityName === "local")
            this.storage = window.localStorage;
        else
            this.storage = window.sessionStorage;
    }
    getItem(key) {
        var _a;
        return eval((_a = this.storage.getItem(key)) !== null && _a !== void 0 ? _a : "");
    }
    setItem(key, value) {
        this.storage.setItem(key, WebStorageAdapter.stringifyValues(value));
    }
}
exports.default = WebStorageAdapter;
