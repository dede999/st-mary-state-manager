import WebStorageAdapter from "../utils/webStorage";

export type UnityAndArray<T> = T | T[];
export type StateTypes =
  | UnityAndArray<number | string | boolean>
  | null
  | undefined;

export type InitialStatePrototype = Record<string, StateTypes>;

export type WebStorageUnityType = "session" | "local";
export type StorageUnityType = WebStorageUnityType;

export abstract class StoreManagementAdapter {
  abstract setItem: (key: string, value: StateTypes) => void;
  abstract getItem: (key: string) => StateTypes;
}

export type Adapter = WebStorageAdapter;

export interface createStoreParameters<T> {
  title: string;
  initialState: Record<keyof T, StateTypes>;
  storageAdapter: Adapter;
}
