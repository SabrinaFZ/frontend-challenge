import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { Delete } from "../Delete";
import { useDelete } from "../useDelete";

// Mock the `useDelete` hook
vi.mock("../useDelete", () => ({
  useDelete: vi.fn(),
}));

describe("Delete Component", () => {
  const mockDeleteItem = vi.fn();

  beforeEach(() => {
    (useDelete as Mock).mockReturnValue({
      deleteItem: mockDeleteItem,
      loading: false,
      error: null,
    });
  });

  it("renders the Delete component", () => {
    render(<Delete id="1" />);

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("opens and closes the dialog", () => {
    render(<Delete id="1" />);

    // Open the dialog
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(
      screen.getByText(/are you sure you want to delete this item/i)
    ).toBeInTheDocument();

    // Close the dialog
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(
      screen.queryByText(/are you sure you want to delete this item/i)
    ).not.toBeInTheDocument();
  });

  it("calls deleteItem on form submission", async () => {
    render(<Delete id="1" />);

    // Open the dialog
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    // Submit the form
    fireEvent.submit(screen.getByRole("form", { name: /delete/i }));

    await waitFor(() => {
      expect(mockDeleteItem).toHaveBeenCalledWith("1");
    });
  });

  it("displays an error message when deletion fails", async () => {
    (useDelete as Mock).mockReturnValue({
      deleteItem: mockDeleteItem,
      loading: false,
      error: "Something went wrong. Please try again later.",
    });

    render(<Delete id="1" />);

    // Open the dialog
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Something went wrong. Please try again later./i)
      ).toBeInTheDocument();
    });
  });
});
