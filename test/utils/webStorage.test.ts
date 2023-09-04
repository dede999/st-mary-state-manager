import WebStorageManager from "../../src/utils/webStorage";
import { StorageUnityType } from "../../src/typings";

class WebStorageManagerWrapper extends WebStorageManager {
  getStorage() {
    return this.storage;
  }
}

describe("WebStorageManager class", () => {
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
});
