import {
  UnityAndArray,
  StateTypes,
  InitialStatePrototype,
  WebStorageUnityType,
  StorageUnityType,
  StoreManagementAdapter,
  createStoreParameters,
} from "./appTypes";

import { DefaultInitialType, DefaultAdapter } from "./lib/stMaryStore";
import StMaryStore, { createStore } from "./lib/stMaryStore";

import WebStorageAdapter from "./utils/webStorage";

export {
  UnityAndArray,
  StateTypes,
  InitialStatePrototype,
  WebStorageUnityType,
  StorageUnityType,
  StoreManagementAdapter,
  createStoreParameters,
  DefaultInitialType,
  DefaultAdapter,
  StMaryStore,
  createStore,
  WebStorageAdapter,
};
