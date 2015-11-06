import assert from "power-assert";
import defaults from "../../src/utils/defaults";

describe("utils", () => {
  describe("defaults(value: any, defaultValue: any): any", () => {
    it("works", () => {
      let UNDEFINED;

      assert(defaults(0, 1) === 0);
      assert(defaults(null, 1) === null);
      assert(defaults(false, 1) === false);
      assert(defaults(UNDEFINED, 1) === 1);
    });
  });
});
