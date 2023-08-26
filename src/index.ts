export interface InitialStatePrototype {
  [key: string]: number | string | boolean | undefined;
}

export function createStore<T extends InitialStatePrototype>(
  initialState: T,
): {
  current: T;
} {
  return {
    current: initialState,
  };
}
