import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { useSort } from "../useSort";
import { useAppContext } from "@/context/useAppContext";

// Mock the context
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("useSort Hook", () => {
  const mockSort = vi.fn();

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue({
      sort: mockSort,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls sort with ascending and then descending order", () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.handleSort("price");
    });

    expect(mockSort).toHaveBeenCalledWith("price", "desc");

    act(() => {
      result.current.handleSort("price");
    });

    expect(mockSort).toHaveBeenCalledWith("price", "asc");
  });

  it("toggles sort order per field independently", () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.handleSort("year");
    });

    expect(mockSort).toHaveBeenCalledWith("year", "desc");

    act(() => {
      result.current.handleSort("model");
    });

    expect(mockSort).toHaveBeenCalledWith("model", "desc");

    act(() => {
      result.current.handleSort("year");
    });

    expect(mockSort).toHaveBeenCalledWith("year", "asc");
  });
});
