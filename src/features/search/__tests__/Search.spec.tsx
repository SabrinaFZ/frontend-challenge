import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { Search } from "../Search";
import { useSearch } from "../useSearch";

// Mocks
vi.mock("../useSearch", () => ({
  useSearch: vi.fn(),
}));

describe("Search Component", () => {
  const mockSetSearchTerm = vi.fn();

  beforeEach(() => {
    (useSearch as Mock).mockReturnValue({
      searchTerm: "",
      setSearchTerm: mockSetSearchTerm,
      loading: false,
    });
  });

  it("renders the Search component", () => {
    render(<Search />);

    expect(
      screen.getByPlaceholderText("Search by text...")
    ).toBeInTheDocument();
  });

  it("calls setSearchTerm when input changes", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search by text...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("test");
  });

  it("displays the loading state when loading is true", () => {
    (useSearch as Mock).mockReturnValue({
      searchTerm: "",
      setSearchTerm: mockSetSearchTerm,
      loading: true,
    });

    render(<Search />);

    expect(screen.getByText("Searching")).toBeInTheDocument();
  });

  it("does not display the loading state when loading is false", () => {
    (useSearch as Mock).mockReturnValue({
      searchTerm: "",
      setSearchTerm: mockSetSearchTerm,
      loading: false,
    });

    render(<Search />);

    expect(screen.queryByText("Searching")).not.toBeInTheDocument();
  });
});
