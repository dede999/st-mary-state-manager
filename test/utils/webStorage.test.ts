import WebStorageManager from "../../src/utils/webStorage";
import { StateTypes, StorageUnityType } from "../../src/typings";

class WebStorageManagerWrapper extends WebStorageManager {
  getStorage() {
    return this.storage;
  }

  static stringifyValuesWrapper(value: StateTypes) {
    return WebStorageManager.stringifyValues(value);
  }

  setStorageMock(storageMock: Storage) {
    this.storage = storageMock;
  }
}

describe("WebStorageManager class", () => {
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
      { scenario: "a string", value: "a word", result: "a word" },
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
    let storageAdapter: WebStorageManagerWrapper;
    let result: number | undefined;

    describe.each([
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
});
