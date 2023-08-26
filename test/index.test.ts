// @ts-ignore
import { createStore } from "../src";

const sampleObject = {
  key1: "value1",
  key2: "value2",
};

describe("createStore function", () => {
  describe("when checking initial state keys", () => {
    it.each(Object.keys(sampleObject))(
      "is expected to find %s key with the initial value",
      (key) => {
        const objectKey = key as keyof typeof sampleObject;
        const { current } = createStore(sampleObject);
        expect(current[objectKey]).toEqual(sampleObject[objectKey]);
      },
    );
  });
});
