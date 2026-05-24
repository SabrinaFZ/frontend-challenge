import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { useWorkshopDetails } from "@/features/workshop-details/useWorkshopDetails";
import { Workshop } from "@/types/workshop";

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("useWorkshopDetails Hook", () => {
  const mockWorkshop: Workshop = {
    id: "1",
    name: "VW Center Berlin",
    location: "Berlin, Germany",
    phone: "+49 30 1234567",
  };

  it("does not fetch when id is undefined", () => {
    const { result } = renderHook(() => useWorkshopDetails(undefined));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("returns loading: true initially when id is provided", () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: mockWorkshop });

    const { result } = renderHook(() => useWorkshopDetails("1"));

    expect(result.current.loading).toBe(true);
  });

  it("fetches and returns workshop details successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockWorkshop });

    const { result } = renderHook(() => useWorkshopDetails("1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockWorkshop);
    expect(result.current.error).toBeNull();
  });

  it("handles errors correctly", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result } = renderHook(() => useWorkshopDetails("1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(new Error("Failed to fetch"));
  });
});
