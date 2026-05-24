import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, expect, it, afterEach, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import { WorkshopsTable } from "@/features/workshops-table/WorkshopsTable";
import { Workshop } from "@/types/workshop";
import * as useWorkshopsTableModule from "@/features/workshops-table/useWorkshopsTable";

// Mocks
vi.mock("@/features/workshops-table/useWorkshopsTable");
vi.mock("@/components/common/Loading", () => ({
  Loading: () => <div data-testid="mock-loading">Mock Loading Component</div>,
}));
vi.mock("@/components/common/Error", () => ({
  Error: () => <div data-testid="mock-error">Mock Error Component</div>,
}));

describe("WorkshopsTable Component", () => {
  beforeEach(() => {
    vi.mocked(useWorkshopsTableModule.useWorkshopsTable).mockReturnValue({
      data: [],
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
        <WorkshopsTable />
      </MemoryRouter>
    );
    expect(screen.getByTestId("mock-loading")).toBeInTheDocument();
  });

  it("should display error state", () => {
    vi.mocked(useWorkshopsTableModule.useWorkshopsTable).mockReturnValue({
      data: [],
      loading: false,
      error: new Error("Failed to fetch data"),
    });

    render(
      <MemoryRouter>
        <WorkshopsTable />
      </MemoryRouter>
    );

    expect(screen.getByTestId("mock-error")).toBeInTheDocument();
  });

  it("should display no data message", () => {
    vi.mocked(useWorkshopsTableModule.useWorkshopsTable).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <WorkshopsTable />
      </MemoryRouter>
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("should render the table with data", async () => {
    const mockData: Workshop[] = [
      {
        id: "1",
        name: "VW Center Berlin",
        location: "Berlin, Germany",
        phone: "+49 30 1234567",
      },
    ];

    vi.mocked(useWorkshopsTableModule.useWorkshopsTable).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <WorkshopsTable />
      </MemoryRouter>
    );

    // Check if table headers are rendered
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();

    // Check if table data is rendered
    await waitFor(() => {
      expect(screen.getByText("VW Center Berlin")).toBeInTheDocument();
      expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();
      expect(screen.getByText("+49 30 1234567")).toBeInTheDocument();
    });
  });
});
