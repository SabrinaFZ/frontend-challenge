import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, Mock } from "vitest";
import { Details } from "../Details";
import { useDetails } from "../useDetails";

// Mocks
vi.mock("../useDetails", () => ({
  useDetails: vi.fn(),
}));
vi.mock("../../../components/common/Loading.tsx", () => ({
  Loading: () => <div data-testid="mock-loading">Mock Loading Component</div>,
}));
vi.mock("../../../components/common/Error.tsx", () => ({
  Error: () => <div data-testid="mock-error">Mock Error Component</div>,
}));

describe("Details Component", () => {
  it("renders loading state", () => {
    (useDetails as Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<Details id="1" />);

    expect(screen.getByTestId("mock-loading")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useDetails as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Failed to fetch details"),
    });

    render(<Details id="1" />);

    expect(screen.getByTestId("mock-error")).toBeInTheDocument();
  });

  it("renders car details", () => {
    (useDetails as Mock).mockReturnValue({
      data: {
        id: "1",
        model: "Golf GTI",
        year: "2023",
        price: "21585",
        engine: "2.0L TDI",
        transmission: "Manual",
      },
      loading: false,
      error: null,
    });

    render(<Details id="1" />);

    expect(screen.getByText(/golf gti/i)).toBeInTheDocument();
    expect(screen.getByText(/2023 model/i)).toBeInTheDocument();
    expect(screen.getByText(/21.585,00 €/i)).toBeInTheDocument();
    expect(screen.getByText(/2.0l tdi/i)).toBeInTheDocument();
    expect(screen.getByText(/manual/i)).toBeInTheDocument();
  });

  it("renders no details message when data is null", () => {
    (useDetails as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<Details id="1" />);

    expect(screen.getByText(/no details/i)).toBeInTheDocument();
  });
});
