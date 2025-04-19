import { renderHook, act } from "@testing-library/react";
import { useDelete } from "../useDelete";
import { useAppContext } from "@/context/useAppContext";
import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";

// Mock axios
const mockedAxios = axios as unknown as {
  delete: ReturnType<typeof vi.fn>;
};

// Mock the context
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("useDelete Hook", () => {
  const mockRemove = vi.fn();

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue({
      remove: mockRemove,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("handles successful deletion", async () => {
    mockedAxios.delete.mockResolvedValueOnce({});

    const { result } = renderHook(() => useDelete());

    await act(async () => {
      await result.current.deleteItem("1");
    });

    // Assert loading state
    expect(result.current.loading).toBe(false);

    // Assert that the API call was made
    expect(mockedAxios.delete).toHaveBeenCalledWith("/api/vehicles/1");

    // Assert that the remove function was called
    expect(mockRemove).toHaveBeenCalledWith("1");

    // Assert no error
    expect(result.current.error).toBe(null);
  });

  it("handles errors during deletion", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useDelete());

    await act(async () => {
      await result.current.deleteItem("1").catch(() => {});
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.error).toBe("Network Error");

    expect(mockRemove).not.toHaveBeenCalled();
  });
});
