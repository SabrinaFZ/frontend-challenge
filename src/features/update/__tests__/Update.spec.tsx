import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { Update } from "../Update";
import { useUpdate } from "../useUpdate";
import { Car } from "@/types/car";

// Mock the `useUpdate` hook
vi.mock("../useUpdate", () => ({
  useUpdate: vi.fn(),
}));

describe("Update Component", () => {
  const mockHandleSubmit = vi.fn();
  const mockHandleChange = vi.fn();
  const mockIsFormValid = vi.fn(() => true);

  const mockCar: Car = {
    id: "1",
    model: "Golf",
    year: "2020",
    price: "20000",
    engine: "1.5L TSI",
    transmission: "Manual",
  };

  beforeEach(() => {
    (useUpdate as Mock).mockReturnValue({
      formData: mockCar,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      isFormValid: mockIsFormValid,
    });
  });

  it("renders the Update component", () => {
    render(<Update car={mockCar} />);

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  it("opens and closes the dialog", () => {
    render(<Update car={mockCar} />);

    // Open the dialog
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(screen.getByText(/update item/i)).toBeInTheDocument();

    // Close the dialog
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByText(/update item/i)).not.toBeInTheDocument();
  });

  it("fills out the form and submits it", async () => {
    render(<Update car={mockCar} />);

    // Open the dialog
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText(/enter model/i), {
      target: { value: "Passat" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter year/i), {
      target: { value: "2021" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter price/i), {
      target: { value: "25000" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("form", { name: /update/i }));

    // Wait for the handleSubmit function to be called
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith(expect.any(Object), "1");
    });

    // Ensure handleChange was called for each field
    expect(mockHandleChange).toHaveBeenCalledTimes(3);
  });

  it("disables the Save button when the form is invalid", () => {
    (useUpdate as Mock).mockReturnValue({
      formData: mockCar,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      isFormValid: vi.fn(() => false), // Simulate invalid form
    });

    render(<Update car={mockCar} />);

    // Open the dialog
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    // Check if the Save button is disabled
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });
});
