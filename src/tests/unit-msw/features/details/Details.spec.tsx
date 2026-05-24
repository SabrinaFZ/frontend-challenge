import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { screen } from "@testing-library/react";
import { Details } from "@/features/details/Details";
import { renderWithProviders } from "../../test-utils";
import { server } from "../../server";

describe("Details (MSW)", () => {
  it("fetches and renders the car for the given id", async () => {
    renderWithProviders(<Details id="1" />);

    expect(await screen.findByText("Golf")).toBeInTheDocument();
    expect(screen.getByText(/2020 model/i)).toBeInTheDocument();
    expect(screen.getByText("20.000,00 €")).toBeInTheDocument();
    expect(screen.getByText("1.5L TSI")).toBeInTheDocument();
    expect(screen.getByText("Manual")).toBeInTheDocument();
  });

  it("renders the error state when the API fails", async () => {
    server.use(
      http.get("/api/cars/:id", () => new HttpResponse(null, { status: 500 }))
    );

    renderWithProviders(<Details id="1" />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
