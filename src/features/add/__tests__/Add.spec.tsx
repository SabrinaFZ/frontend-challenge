import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { Add } from "../Add";
import { useAdd } from "../useAdd";

// Mocks
vi.mock("../useAdd", () => ({
  useAdd: vi.fn(),
}));

describe("Add Component", () => {
  const mockHandleSubmit = vi.fn();
  const mockHandleChange = vi.fn();
  const mockIsFormValid = vi.fn(() => true);

  beforeEach(() => {
    (useAdd as Mock).mockReturnValue({
      formData: {
        model: "",
        year: "",
        price: "",
        engine: "1.0L TSI",
        transmission: "Manual",
      },
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      isFormValid: mockIsFormValid,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Utility function to open the dialog
  const openDialog = () => {
    fireEvent.click(screen.getByText("Add Item"));
    return waitFor(() => screen.getByPlaceholderText("Enter year"));
  };

  it("renders the Add component and opens the dialog", async () => {
    render(<Add />);

    // Check if the "Add Item" button is in the document
    expect(screen.getByText("Add Item")).toBeInTheDocument();

    // Open the dialog by clicking the Add Item button
    await openDialog();

    // Check if the form fields are rendered
    expect(screen.getByPlaceholderText("Enter year")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter price")).toBeInTheDocument();
    expect(screen.getByText("Engine Type")).toBeInTheDocument();
  });

  it("checks if the Add Item button is clickable and opens the dialog", async () => {
    render(<Add />);

    // Ensure the "Add Item" button is present and clickable
    const addButton = screen.getByText("Add Item");
    expect(addButton).toBeInTheDocument();

    // Open the dialog
    await openDialog();

    // Assert that the dialog opened correctly
    expect(screen.getByPlaceholderText("Enter year")).toBeInTheDocument();
  });

  it("allows the user to fill out the form", async () => {
    render(<Add />);

    // Open the dialog
    await openDialog();

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText("Enter year"), {
      target: { value: "2023" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter price"), {
      target: { value: "30000" },
    });

    // Simulate selecting engine type
    fireEvent.change(screen.getByDisplayValue("1.0L TSI"), {
      target: { value: "1.5L TSI" },
    });

    // Ensure `handleChange` is called for each field
    expect(mockHandleChange).toHaveBeenCalledTimes(3);
  });

  it("submits the form when valid", async () => {
    render(<Add />);

    // Open the dialog
    await openDialog();

    // Submit the form
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // Ensure `handleSubmit` is called
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables the Save button when the form is invalid", () => {
    (useAdd as Mock).mockReturnValue({
      formData: {
        model: "",
        year: "",
        price: "",
        engine: "1.0L TSI",
        transmission: "Manual",
      },
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      isFormValid: vi.fn(() => false), // Simulate invalid form
    });

    render(<Add />);

    // Open the dialog
    fireEvent.click(screen.getByText("Add Item"));
    expect(screen.getByPlaceholderText("Enter year")).toBeInTheDocument();

    // Check if the Save button is disabled
    expect(screen.getByText("Save")).toBeDisabled();
  });
});
