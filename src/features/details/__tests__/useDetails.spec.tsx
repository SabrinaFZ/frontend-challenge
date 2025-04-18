import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { useDetails } from "../useDetails";
import { Car } from "@/types/car";

// Mocks
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("useDetails Hook", () => {
  const mockCar: Car = {
    id: "1",
    model: "Golf GTI",
    year: "2023",
    price: "21585",
    engine: "2.0L TDI",
    transmission: "Manual",
  };

  it("fetches and returns car details successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCar });

    const { result } = renderHook(() => useDetails("1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockCar);
    expect(result.current.error).toBeNull();
  });

  it("handles errors correctly", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result } = renderHook(() => useDetails("1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(new Error("Failed to fetch"));
  });

  it("does nothing if id is undefined", async () => {
    const { result } = renderHook(() => useDetails(undefined));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
