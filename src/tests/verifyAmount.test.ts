import { verifyAmount } from "../utils/verifyAmount";

describe("Checks if the string is a valid monetary amount", () => {
  test("Amount less than 10", () => {
    const str1 = "1";
    const str2 = "1.50";
    const str3 = "1.543";
    const str4 = "2,849";
    expect(verifyAmount(str1)).toBe(true);
    expect(verifyAmount(str2)).toBe(true);
    expect(verifyAmount(str3)).toBe(false);
    expect(verifyAmount(str4)).toBe(false);
  });
  test("Amount less than 100", () => {
    const str1 = "56";
    const str2 = "47.89";
    const str3 = "13.543";
    const str4 = "22,849";
    expect(verifyAmount(str1)).toBe(true);
    expect(verifyAmount(str2)).toBe(true);
    expect(verifyAmount(str3)).toBe(false);
    expect(verifyAmount(str4)).toBe(false);
  });
  test("Non-digits should not be allowed", () => {
    const str1 = "hello";
    const str2 = "hello, world";
    const str3 = "13.55 hello";
    const str4 = "12, hi, 400.50";
    expect(verifyAmount(str1)).toBe(false);
    expect(verifyAmount(str2)).toBe(false);
    expect(verifyAmount(str3)).toBe(false);
    expect(verifyAmount(str4)).toBe(false);
  });
});
