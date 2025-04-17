import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach, Mock } from "vitest";
import { useApp } from "../useApp";
import axios from "axios";
import { useAppContext } from "@/context/useAppContext";

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("useApp", () => {
  const mockSet = vi.fn();
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

  beforeEach(() => {
    (useAppContext as unknown as Mock).mockReturnValue({
      data: [],
      set: mockSet,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns initial loading state", () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useApp());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("fetches and sets data on success", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useApp());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockSet).toHaveBeenCalledWith(mockData);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error correctly", async () => {
    mockedAxios.get = vi.fn().mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useApp());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Network Error");
    expect(mockSet).not.toHaveBeenCalled();
  });
});
