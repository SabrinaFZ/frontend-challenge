import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { screen } from "@testing-library/react";
import { WorkshopDetails } from "@/features/workshop-details/WorkshopDetails";
import { renderWithProviders } from "../../test-utils";
import { server } from "../../server";

describe("WorkshopDetails (MSW)", () => {
  it("fetches and renders the workshop for the given id", async () => {
    renderWithProviders(<WorkshopDetails id="2" />);

    expect(await screen.findByText("VW Center Munich")).toBeInTheDocument();
    expect(screen.getByText("Munich, Germany")).toBeInTheDocument();
    expect(screen.getByText("+49 89 7654321")).toBeInTheDocument();
  });

  it("renders the error state when the API fails", async () => {
    server.use(
      http.get(
        "/api/workshops/:id",
        () => new HttpResponse(null, { status: 500 })
      )
    );

    renderWithProviders(<WorkshopDetails id="1" />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
