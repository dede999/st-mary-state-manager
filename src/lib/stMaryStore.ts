import {
  createStoreParameters,
  InitialStatePrototype,
  StoreManagementAdapter,
} from "../appTypes";

export type DefaultInitialType = InitialStatePrototype;
export type DefaultAdapter = StoreManagementAdapter;

export default class StMaryStore<
  T extends InitialStatePrototype = DefaultInitialType,
  K extends StoreManagementAdapter = DefaultAdapter,
> {
  protected constructor(
    protected title: string,
    protected initialState: T,
    protected adapter: K,
  ) {}
  meta: any = {};
  getters: any = {};
  setters: any = {};

  static capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  defineGetters(key: string) {
    this.getters[`get${StMaryStore.capitalizeFirstLetter(key)}`] = () =>
      this.adapter.getItem(`${this.title}:${key}`);
  }

  defineSetters(key: string) {
    this.setters[`set${StMaryStore.capitalizeFirstLetter(key)}`] = (
      value: any,
    ) => this.adapter.setItem(`${this.title}:${key}`, value);
  }

  addMetaKey(key: string) {
    this.meta[key] = {
      initialValue: this.initialState[key],
      setter: this.setters[`set${StMaryStore.capitalizeFirstLetter(key)}`],
    };
  }

  resetMethod() {
    Object.keys(this.meta).forEach((key) => {
      const { initialValue, setter } = this.meta[key];
      setter(initialValue);
    });
  }

  setup() {
    Object.keys(this.initialState).forEach((key: string) => {
      this.defineGetters(key);
      this.defineSetters(key);
      this.addMetaKey(key);
    });
    this.resetMethod();
  }

  static createStore<
    T extends InitialStatePrototype,
    K extends StoreManagementAdapter,
  >({
    title,
    initialState,
    storageAdapter,
  }: createStoreParameters<T, K>): {
    [M in keyof T as `get${Capitalize<string & M>}`]: () => T[M];
  } & {
    [M in keyof T as `set${Capitalize<string & M>}`]: (value: T[M]) => void;
  } & {
    reset: () => void;
  } {
    const instance = new StMaryStore(title, initialState, storageAdapter);
    instance.setup();
    return {
      ...instance.setters,
      ...instance.getters,
      reset: instance.resetMethod,
    };
  }
}

export const createStore = StMaryStore.createStore;
