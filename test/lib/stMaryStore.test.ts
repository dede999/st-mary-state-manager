import { StMaryStore } from "../../src";
import WebStorageAdapter from "../../src/utils/webStorage";

const sampleObject = {
  key1: "value1",
  key2: "value2",
};
const testAdapter = new WebStorageAdapter("local");

class StMaryStoreWrapper extends StMaryStore {
  static initializerTester() {
    const instance = new StMaryStoreWrapper("test", sampleObject, testAdapter);
    return {
      instance,
      title: instance.title,
      initialState: instance.initialState,
      adapter: instance.adapter,
    };
  }
}

describe("StMaryStore class", () => {
  describe("constructor method", () => {
    it.each(Object.keys(sampleObject))(
      "is expected to find %s key with the initial state values",
      (key) => {
        const objectKey = key as keyof typeof sampleObject;
        const { initialState } = StMaryStoreWrapper.initializerTester();
        expect(initialState[objectKey]).toEqual(sampleObject[objectKey]);
      },
    );

    it.each([
      { key: "title", expectedValue: "test" },
      { key: "adapter", expectedValue: testAdapter },
    ])(
      "is expected for $key property to have an expected value",
      ({ key, expectedValue }) => {
        const store = StMaryStoreWrapper.initializerTester();
        expect(store[key as "title" | "adapter"]).toEqual(expectedValue);
      },
    );
  });

  describe("capitalizeFirstLetter static method", () => {
    it("is expected to have capitalized th first letter", () => {
      expect(StMaryStoreWrapper.capitalizeFirstLetter("test")).toEqual("Test");
    });
  });

  describe("definition methods", () => {
    const initializer = StMaryStoreWrapper.initializerTester();
    const instance = initializer.instance;
    const adapterGetterSpy = jest.spyOn(testAdapter, "getItem");
    const adapterSetterSpy = jest.spyOn(testAdapter, "setItem");

    beforeEach(() => {
      instance.setup();
    });

    describe("addMetaKey method", () => {
      describe.each(Object.keys(sampleObject))(
        "when checking %s key",
        (key) => {
          it.each(["initialValue", "setter"])(
            "is expected to have the correct value for meta key %s",
            (metaKey) => {
              if (metaKey === "initialValue") {
                expect(instance.meta[key].initialValue).toEqual(
                  sampleObject[key as keyof typeof sampleObject],
                );
              } else {
                expect(instance.meta[key].setter).toEqual(
                  instance.setters[
                    `set${StMaryStoreWrapper.capitalizeFirstLetter(key)}`
                  ],
                );
              }
            },
          );
        },
      );
    });

    describe.each([
      { methodName: "defineGetters", instanceKey: "getters", action: "get" },
      { methodName: "defineSetters", instanceKey: "setters", action: "set" },
    ])("$methodName method", ({ instanceKey, action }) => {
      const currentSpyMethod =
        action === "get" ? adapterGetterSpy : adapterSetterSpy;

      it(`is expected have added the ${instanceKey}`, () => {
        expect(
          Object.keys(instance[instanceKey as "getters" | "setters"]),
        ).toEqual(
          Object.keys(sampleObject).map(
            (key) =>
              `${action}${StMaryStoreWrapper.capitalizeFirstLetter(key)}`,
          ),
        );
      });

      it.each(
        Object.keys(sampleObject).map((key) => ({
          spyParameters:
            action === "get" ? [`test:${key}`] : [`test:${key}`, "value"],
          parameter: action === "get" ? undefined : "value",
          methodName: `${action}${StMaryStore.capitalizeFirstLetter(key)}`,
        })),
      )(
        "is expected to have triggered an specific adapter after $methodName",
        ({ spyParameters, parameter, methodName }) => {
          instance[instanceKey as "getters" | "setters"][methodName](parameter);
          expect(currentSpyMethod).toHaveBeenCalledWith(...spyParameters);
        },
      );
    });

    describe("resetMethod method", () => {
      const adapterSetterSpy = jest.spyOn(testAdapter, "setItem");

      it("is expected to have called the setters with the initial value", () => {
        instance.resetMethod();

        expect(adapterSetterSpy).toHaveBeenCalledWith(
          "test:key1",
          sampleObject.key1,
        );
        expect(adapterSetterSpy).toHaveBeenCalledWith(
          "test:key2",
          sampleObject.key2,
        );
      });
    });
  });

  describe("createStore methods", () => {
    const getterAndSetterKeys = Object.keys(sampleObject)
      .map((key) => [
        `get${StMaryStore.capitalizeFirstLetter(key)}`,
        `set${StMaryStore.capitalizeFirstLetter(key)}`,
      ])
      .flat();

    it("is expected to have produced an object wth all necessary keys", () => {
      expect(
        Object.keys(
          StMaryStoreWrapper.createStore({
            title: "test",
            initialState: sampleObject,
            storageAdapter: testAdapter,
          }),
        ),
      ).toEqual(expect.arrayContaining([...getterAndSetterKeys, "reset"]));
    });
  });
});
