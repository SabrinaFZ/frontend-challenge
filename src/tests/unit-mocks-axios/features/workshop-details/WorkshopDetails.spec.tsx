import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, Mock } from "vitest";
import { WorkshopDetails } from "@/features/workshop-details/WorkshopDetails";
import { useWorkshopDetails } from "@/features/workshop-details/useWorkshopDetails";

// Mocks
vi.mock("@/features/workshop-details/useWorkshopDetails", () => ({
  useWorkshopDetails: vi.fn(),
}));
vi.mock("@/components/common/Loading", () => ({
  Loading: () => <div data-testid="mock-loading">Mock Loading Component</div>,
}));
vi.mock("@/components/common/Error", () => ({
  Error: () => <div data-testid="mock-error">Mock Error Component</div>,
}));

describe("WorkshopDetails Component", () => {
  it("renders loading state", () => {
    (useWorkshopDetails as Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<WorkshopDetails id="1" />);

    expect(screen.getByTestId("mock-loading")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useWorkshopDetails as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Failed to fetch details"),
    });

    render(<WorkshopDetails id="1" />);

    expect(screen.getByTestId("mock-error")).toBeInTheDocument();
  });

  it("renders workshop details", () => {
    (useWorkshopDetails as Mock).mockReturnValue({
      data: {
        id: "1",
        name: "VW Center Berlin",
        location: "Berlin, Germany",
        phone: "+49 30 1234567",
      },
      loading: false,
      error: null,
    });

    render(<WorkshopDetails id="1" />);

    expect(screen.getByText(/VW Center Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin, Germany/i)).toBeInTheDocument();
    expect(screen.getByText(/\+49 30 1234567/i)).toBeInTheDocument();
  });

  it("renders no details message when data is null", () => {
    (useWorkshopDetails as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<WorkshopDetails id="1" />);

    expect(screen.getByText(/no details/i)).toBeInTheDocument();
  });
});
