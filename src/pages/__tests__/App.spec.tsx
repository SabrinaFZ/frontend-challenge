import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, expect, it, afterEach, beforeEach } from "vitest";
import App from "../App";
import * as useAppModule from "../useApp";
import { Car } from "@/types/car";
import { MemoryRouter } from "react-router";

// Mocks
vi.mock("../useApp.tsx");
vi.mock("../../features/add/Add.tsx", () => ({
  Add: () => <div data-testid="mock-add">Mock Add Component</div>,
}));
vi.mock("../../features/search/Search.tsx", () => ({
  Search: () => <div data-testid="mock-search">Mock Search Component</div>,
}));
vi.mock("../../features/delete/Delete.tsx", () => ({
  Delete: () => <div data-testid="mock-delete">Mock Delete Component</div>,
}));
vi.mock("../../features/update/Update.tsx", () => ({
  Update: () => <div data-testid="mock-update">Mock Update Component</div>,
}));
vi.mock("../../features/sort/Sort.tsx", () => ({
  Sort: ({ field, label }: { field: string; label: string }) => (
    <div data-testid={`mock-sort-${field}`}>{label}</div>
  ),
}));

describe("App", () => {
  beforeEach(() => {
    vi.mocked(useAppModule.useApp).mockReturnValue({
      filteredData: [],
      loading: true,
      error: null,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should display loading state", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error state", () => {
    vi.mocked(useAppModule.useApp).mockReturnValue({
      filteredData: [],
      loading: false,
      error: new Error("Failed to fetch data"),
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
  });

  it("should display no data message", () => {
    vi.mocked(useAppModule.useApp).mockReturnValue({
      filteredData: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("should render the table with data", async () => {
    const mockData = [
      {
        id: "1",
        model: "Golf",
        year: "2020",
        price: "20000",
        engine: "1.5L",
        transmission: "Manual",
      },
    ] as Car[];

    vi.mocked(useAppModule.useApp).mockReturnValue({
      filteredData: mockData,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if table headers are rendered
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Engine")).toBeInTheDocument();
    expect(screen.getByText("Transmission")).toBeInTheDocument();

    // Check if table data is rendered
    await waitFor(() => {
      expect(screen.getByText("Golf")).toBeInTheDocument();
      expect(screen.getByText("2020")).toBeInTheDocument();
      expect(screen.getByText("20.000,00 €")).toBeInTheDocument();
      expect(screen.getByText("1.5L")).toBeInTheDocument();
      expect(screen.getByText("Manual")).toBeInTheDocument();
    });
  });
});
