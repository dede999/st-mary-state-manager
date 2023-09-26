import { Adapter, createStoreParameters, InitialStatePrototype } from "../appTypes";
export default class StMaryStore<I extends InitialStatePrototype> {
    protected title: string;
    protected initialState: I;
    protected adapter: Adapter;
    protected constructor(title: string, initialState: I, adapter: Adapter);
    meta: any;
    getters: any;
    setters: any;
    static capitalizeFirstLetter(s: string): string;
    defineGetters(key: string): void;
    defineSetters(key: string): void;
    addMetaKey(key: string): void;
    resetMethod(): void;
    setup(): void;
    static createStore<T>({ title, initialState, storageAdapter, }: createStoreParameters<T>): {
        [M in keyof T as `get${Capitalize<string & M>}`]: () => T[M];
    } & {
        [M in keyof T as `set${Capitalize<string & M>}`]: (value: T[M]) => void;
    } & {
        reset: () => void;
    };
}
export declare const createStore: typeof StMaryStore.createStore;
