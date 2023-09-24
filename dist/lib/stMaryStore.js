"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
class StMaryStore {
    constructor(title, initialState, adapter) {
        this.title = title;
        this.initialState = initialState;
        this.adapter = adapter;
        this.meta = {};
        this.getters = {};
        this.setters = {};
    }
    static capitalizeFirstLetter(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    defineGetters(key) {
        this.getters[`get${StMaryStore.capitalizeFirstLetter(key)}`] = () => this.adapter.getItem(`${this.title}:${key}`);
    }
    defineSetters(key) {
        this.setters[`set${StMaryStore.capitalizeFirstLetter(key)}`] = (value) => this.adapter.setItem(`${this.title}:${key}`, value);
    }
    addMetaKey(key) {
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
        Object.keys(this.initialState).forEach((key) => {
            this.defineGetters(key);
            this.defineSetters(key);
            this.addMetaKey(key);
        });
        this.resetMethod();
    }
    static createStore({ title, initialState, storageAdapter, }) {
        const instance = new StMaryStore(title, initialState, storageAdapter);
        instance.setup();
        return Object.assign(Object.assign(Object.assign({}, instance.setters), instance.getters), { reset: instance.resetMethod });
    }
}
exports.default = StMaryStore;
exports.createStore = StMaryStore.createStore;
