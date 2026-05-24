import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import { useWorkshopsTable } from "@/features/workshops-table/useWorkshopsTable";
import axios from "axios";

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("useWorkshopsTable", () => {
  const mockData = [
    {
      id: "1",
      name: "VW Center Berlin",
      location: "Berlin, Germany",
      phone: "+49 30 1234567",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns initial loading state", () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useWorkshopsTable());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("fetches and sets data on success", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useWorkshopsTable());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error correctly", async () => {
    mockedAxios.get = vi.fn().mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useWorkshopsTable());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Network Error");
  });
});
