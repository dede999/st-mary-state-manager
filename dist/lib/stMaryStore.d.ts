import { createStoreParameters, InitialStatePrototype, StoreManagementAdapter } from "../appTypes";
export type DefaultInitialType = InitialStatePrototype;
export type DefaultAdapter = StoreManagementAdapter;
export default class StMaryStore<T extends InitialStatePrototype = DefaultInitialType, K extends StoreManagementAdapter = DefaultAdapter> {
    protected title: string;
    protected initialState: T;
    protected adapter: K;
    protected constructor(title: string, initialState: T, adapter: K);
    meta: any;
    getters: any;
    setters: any;
    static capitalizeFirstLetter(s: string): string;
    defineGetters(key: string): void;
    defineSetters(key: string): void;
    addMetaKey(key: string): void;
    resetMethod(): void;
    setup(): void;
    static createStore<T extends InitialStatePrototype, K extends StoreManagementAdapter>({ title, initialState, storageAdapter, }: createStoreParameters<T, K>): {
        [M in keyof T as `get${Capitalize<string & M>}`]: () => T[M];
    } & {
        [M in keyof T as `set${Capitalize<string & M>}`]: (value: T[M]) => void;
    } & {
        reset: () => void;
    };
}
export declare const createStore: typeof StMaryStore.createStore;
