export interface InitialStatePrototype {
  [key: string]: number | string | boolean | undefined;
}
export declare function createStore<T extends InitialStatePrototype>(
  initialState: T,
): {
  current: T;
};
