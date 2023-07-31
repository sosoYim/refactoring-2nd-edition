import { Province, sampleProvinceData } from "./index.js";

describe("province", function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });

  it("shortfall", function () {
    expect(asia.shortfall).toEqual(5);
  });

  it("profit", function () {
    expect(asia.profit).toEqual(230);
  });
});
