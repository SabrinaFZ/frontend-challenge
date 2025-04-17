import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, expect, it, afterEach, beforeEach } from "vitest";
import App from "../App";
import * as useAppModule from "../useApp";
import { Car } from "@/types/car";

// Mocks
vi.mock("../useApp.tsx");
vi.mock("../features/add/Add.tsx", () => ({
  Add: () => <div data-testid="mock-add">Mock Add Component</div>,
}));

describe("App", () => {
  beforeEach(() => {
    vi.mocked(useAppModule.useApp).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should display loading state", () => {
    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error state", () => {
    vi.mocked(useAppModule.useApp).mockReturnValue({
      data: [],
      loading: false,
      error: new Error("Failed to fetch data"),
    });

    render(<App />);

    expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
  });

  it("should display no data message", () => {
    vi.mocked(useAppModule.useApp).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<App />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
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
      data: mockData,
      loading: false,
      error: null,
    });

    render(<App />);

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
