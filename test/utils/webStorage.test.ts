import WebStorageManager from "../../src/utils/webStorage";
import { StorageUnityType } from "../../src/typings";

class WebStorageManagerWrapper extends WebStorageManager {
  getStorage() {
    return this.storage;
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
