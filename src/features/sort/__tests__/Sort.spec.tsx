import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { Sort } from "../Sort";
import { useSort } from "../useSort";

// Mocks
vi.mock("../useSort", () => ({
  useSort: vi.fn(),
}));

describe("Sort Component", () => {
  const mockHandleSort = vi.fn();

  beforeEach(() => {
    (useSort as Mock).mockReturnValue({
      handleSort: mockHandleSort,
    });
  });

  it("renders the Sort component with the correct label", () => {
    render(<Sort field="model" label="Model" />);

    expect(screen.getByText("Model")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /model/i })).toBeInTheDocument();
  });

  it("calls handleSort when the button is clicked", () => {
    render(<Sort field="model" label="Model" />);

    fireEvent.click(screen.getByRole("button", { name: /model/i }));

    expect(mockHandleSort).toHaveBeenCalledWith("model");
  });
});
