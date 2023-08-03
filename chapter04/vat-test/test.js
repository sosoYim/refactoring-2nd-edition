import calculateAmount from "./index.js";

describe("totalAmount가 음수일 때", () => {
  it("null을 반환한다.", () => {
    expect(calculateAmount(-100)).toBe(null);
  });
});

describe("totalAmount가 0일 때", () => {
  it("공급가액: 0, VAT: 0", () => {
    const result = calculateAmount(0);
    expect(result.supplyAmount).toBe(0);
    expect(result.VAT).toBe(0);
  });
});

describe("totalAmount가 소수점을 포함하지 않는 양수일 때 (예: 100)", () => {
  it("공급가액: 91, VAT: 9", () => {
    const result = calculateAmount(100);
    expect(result.supplyAmount).toBe(91);
    expect(result.VAT).toBe(9);
  });
});

describe("totalAmount가 소수점을 포함하는 양수일 때 (예: 100.5)", () => {
  it("공급가액: 91, VAT: 9.5", () => {
    const result = calculateAmount(100.5);
    expect(result.supplyAmount).toBe(91);
    expect(result.VAT).toBe(9.5);
  });
});
