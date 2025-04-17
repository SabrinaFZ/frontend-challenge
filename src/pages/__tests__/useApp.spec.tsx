import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { useApp } from "../useApp";

describe("useApp", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch and return data successfully", async () => {
    const mockData = [
      {
        id: 1,
        model: "Golf",
        year: 2020,
        price: 20000,
        engine: "1.5L",
        transmission: "Manual",
      },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })
    );

    const { result } = renderHook(() => useApp());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: false,
      })
    );

    const { result } = renderHook(() => useApp());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Network response was not ok");
  });
});
