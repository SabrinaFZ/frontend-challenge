import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { useSearch } from "../useSearch";
import { useAppContext } from "@/context/useAppContext";

// Mocks
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("useSearch Hook", () => {
  const mockFilter = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    (useAppContext as Mock).mockReturnValue({
      filter: mockFilter,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.loading).toBe(false);
    expect(result.current.searchTerm).toBe("");
  });

  it("updates searchTerm and calls filter after debounce", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchTerm("test");
    });

    expect(result.current.loading).toBe(true);

    // Advance time by 300ms (debounce duration)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockFilter).toHaveBeenCalledWith("test");

    expect(result.current.loading).toBe(false);
  });

  it("resets loading and calls filter immediately for an empty search term", () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchTerm("");
    });

    expect(result.current.loading).toBe(false);

    expect(mockFilter).toHaveBeenCalledWith("");
  });
});
