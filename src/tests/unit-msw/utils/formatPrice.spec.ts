import { describe, expect, it } from "vitest";
import { formatPrice } from "@/utils/formatPrice";

describe("formatPrice", () => {
  it("formats a number as EUR with the de-DE locale", () => {
    expect(formatPrice(20000)).toBe("20.000,00 €");
  });
});
