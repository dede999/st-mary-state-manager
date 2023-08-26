"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
function createStore(initialState) {
  return {
    current: initialState,
  };
}
exports.createStore = createStore;
