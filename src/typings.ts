export type UnityAndArray<T> = T | T[];
export type StateTypes =
  | UnityAndArray<number | string | boolean>
  | null
  | undefined;

export interface InitialStatePrototype {
  [key: string]: StateTypes;
}

export type WebStorageUnityType = "session" | "local";
export type StorageUnityType = WebStorageUnityType;

export abstract class StoreManagementAdapter {
  abstract setItem: (key: string, value: StateTypes) => void;
  abstract getItem: (key: string) => StateTypes;
}

export interface createStoreParameters<
  T extends InitialStatePrototype,
  K extends StoreManagementAdapter,
> {
  title: string;
  initialState: T;
  storageAdapter: K;
}
