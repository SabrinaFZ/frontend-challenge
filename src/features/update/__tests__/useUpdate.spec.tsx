import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { useUpdate } from "../useUpdate";
import { useAppContext } from "@/context/useAppContext";
import { Car } from "@/types/car";

// Mocks
const mockedAxios = axios as unknown as {
  put: ReturnType<typeof vi.fn>;
};

// Mock the context
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("useUpdate Hook", () => {
  const mockUpdate = vi.fn();
  const mockCar: Car = {
    id: "1",
    model: "Golf",
    year: "2020",
    price: "20000",
    engine: "1.5L TSI",
    transmission: "Manual",
  };

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue({
      update: mockUpdate,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useUpdate(mockCar));

    expect(result.current.formData).toEqual(mockCar);

    expect(result.current.isFormValid()).toBe(true);
  });

  it("updates formData when handleChange is called", () => {
    const { result } = renderHook(() => useUpdate(mockCar));

    act(() => {
      result.current.handleChange({
        target: { name: "model", value: "Passat" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.model).toBe("Passat");
  });

  it("validates the form correctly", () => {
    const { result } = renderHook(() => useUpdate(mockCar));

    act(() => {
      result.current.handleChange({
        target: { name: "model", value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isFormValid()).toBe(false);
  });

  it("submits the form successfully", async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: { ...mockCar, model: "Passat" },
    });

    const { result } = renderHook(() => useUpdate(mockCar));

    const success = await act(async () => {
      return await result.current.handleSubmit(
        { preventDefault: vi.fn() } as unknown as React.FormEvent,
        "1"
      );
    });

    expect(success).toBe(true);

    expect(mockedAxios.put).toHaveBeenCalledWith("/api/vehicles/1", mockCar);

    expect(mockUpdate).toHaveBeenCalledWith("1", {
      ...mockCar,
      model: "Passat",
    });
  });

  it("handles errors during form submission", async () => {
    mockedAxios.put.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useUpdate(mockCar));

    const success = await act(async () => {
      return await result.current.handleSubmit(
        { preventDefault: vi.fn() } as unknown as React.FormEvent,
        "1"
      );
    });

    expect(success).toBe(false);

    expect(mockedAxios.put).toHaveBeenCalledWith("/api/vehicles/1", mockCar);

    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
