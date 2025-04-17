import { describe, expect, it } from "vitest";
import { formatPrice } from "../formatPrice";

describe("formatPrice", () => {
  it("should format a number as a price in EUR", () => {
    const result = formatPrice(20000);
    expect(result).toBe("20.000,00 €");
  });
});
