import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { useAdd } from "../useAdd";
import { useAppContext } from "@/context/useAppContext";
import axios from "axios";

// Mock axios
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};

// Mock useAppContext
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("useAdd Hook", () => {
  const mockAdd = vi.fn();

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue({
      add: mockAdd,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should handle form submission successfully", async () => {
    const mockResponse = {
      data: {
        id: "1",
        model: "Test Model",
        year: "2023",
        price: "30000",
        engine: "1.5L TSI",
        transmission: "Manual",
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAdd());

    // Update form data
    act(() => {
      result.current.handleChange({
        target: { name: "model", value: "Test Model" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "year", value: "2023" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "price", value: "30000" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "engine", value: "1.5L TSI" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "transmission", value: "Manual" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Submit the form
    let resultValue: boolean = false;
    await act(async () => {
      resultValue = await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    // Assertions
    expect(resultValue).toBe(true);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/data",
      {
        model: "Test Model",
        year: "2023",
        price: "30000",
        engine: "1.5L TSI",
        transmission: "Manual",
      }
    );
    expect(mockAdd).toHaveBeenCalledWith(mockResponse.data);
    expect(result.current.formData).toEqual({
      model: "",
      year: "",
      price: "",
      engine: "",
      transmission: "",
    });
  });

  it("should handle form submission failure", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useAdd());

    // Update form data
    act(() => {
      result.current.handleChange({
        target: { name: "model", value: "Test Model" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "year", value: "2023" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "price", value: "30000" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "engine", value: "1.5L TSI" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: "transmission", value: "Manual" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Submit the form
    let resultValue: boolean = false;
    await act(async () => {
      resultValue = await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    // Assertions
    expect(resultValue).toBe(false);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/data",
      {
        model: "Test Model",
        year: "2023",
        price: "30000",
        engine: "1.5L TSI",
        transmission: "Manual",
      }
    );
    expect(mockAdd).not.toHaveBeenCalled();
    expect(result.current.formData).toEqual({
      model: "Test Model",
      year: "2023",
      price: "30000",
      engine: "1.5L TSI",
      transmission: "Manual",
    }); // Form data should remain unchanged on failure
  });
});
