import WebStorageAdapter from "../../src/utils/webStorage";
import { StateTypes, StorageUnityType } from "../../src/typings";

class WebStorageManagerWrapper extends WebStorageAdapter {
  getStorage() {
    return this.storage;
  }

  static stringifyValuesWrapper(value: StateTypes) {
    return WebStorageAdapter.stringifyValues(value);
  }

  setStorageMock(storageMock: Storage) {
    this.storage = storageMock;
  }
}

describe("WebStorageManager class", () => {
  let storageAdapter: WebStorageManagerWrapper;
  const getItemMock = jest.fn();
  const setItemMock = jest.fn();

  const storageMock = {
    getItem: getItemMock,
    setItem: setItemMock,
  } as unknown as Storage;

  describe("stringifyValues", () => {
    describe.each([
      { scenario: "undefined", value: undefined, result: "undefined" },
      { scenario: "null", value: null, result: "null" },
      { scenario: "a number", value: 42, result: "42" },
      { scenario: "a string", value: "a word", result: '"a word"' },
      { scenario: "a boolean", value: true, result: "true" },
      {
        scenario: "an array of numbers",
        value: [42, 3.1415],
        result: "[42,3.1415]",
      },
      {
        scenario: "an array of string",
        value: ["word1", "word2"],
        result: '["word1","word2"]',
      },
      {
        scenario: "an array of booleans",
        value: [true, false],
        result: "[true,false]",
      },
      {
        scenario: "an array of multiple types",
        value: [true, false, "0", 1, 2],
        result: '[true,false,"0",1,2]',
      },
    ])("when value is $scenario", ({ value, result }) => {
      it(`is expected to have returned "${result}"`, () => {
        expect(WebStorageManagerWrapper.stringifyValuesWrapper(value)).toEqual(
          result,
        );
      });
    });
  });

  describe("constructor", () => {
    describe.each([
      { unityName: "local", storageUnity: window.localStorage },
      { unityName: "session", storageUnity: window.sessionStorage },
    ])(
      "when initializing a $unityName unity",
      ({ unityName, storageUnity }) => {
        it("is expected to use the correct storage", () => {
          expect(
            new WebStorageManagerWrapper(
              unityName as StorageUnityType,
            ).getStorage(),
          ).toEqual(storageUnity);
        });
      },
    );
  });

  describe("getItem", () => {
    let result: number | undefined;

    describe.each([
      {
        mockedGetValue: '[0, "word", false]',
        expectedValue: [0, "word", false],
      },
      { mockedGetValue: "42", expectedValue: 42 },
      { mockedGetValue: null, expectedValue: undefined },
    ])(
      "when mockedGetValue is $mockedGetValue",
      ({ mockedGetValue, expectedValue }) => {
        beforeEach(() => {
          getItemMock.mockReturnValue(mockedGetValue);
          storageAdapter = new WebStorageManagerWrapper("local");
          storageAdapter.setStorageMock(storageMock);
          result = storageAdapter.getItem("key");
        });

        it(`is expected to return ${expectedValue}`, () => {
          expect(result).toEqual(expectedValue);
        });
      },
    );
  });

  describe("setItem", () => {
    beforeEach(() => {
      storageAdapter = new WebStorageManagerWrapper("local");
      storageAdapter.setStorageMock(storageMock);
      storageAdapter.setItem("key", 42);
    });

    it("is expected to have set an item info", () => {
      expect(setItemMock).toHaveBeenCalledWith("key", "42");
    });
  });
});
