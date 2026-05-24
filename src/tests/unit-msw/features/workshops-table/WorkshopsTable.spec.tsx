import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { WorkshopsTable } from "@/features/workshops-table/WorkshopsTable";
import { renderWithProviders } from "../../test-utils";
import { server } from "../../server";

describe("WorkshopsTable (MSW)", () => {
  it("fetches and renders the workshops", async () => {
    renderWithProviders(<WorkshopsTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(screen.getByText("VW Center Berlin")).toBeInTheDocument();
    expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();
    expect(screen.getByText("VW Center Munich")).toBeInTheDocument();
  });

  it("renders the empty state when the API returns no workshops", async () => {
    server.use(http.get("/api/workshops", () => HttpResponse.json([])));

    renderWithProviders(<WorkshopsTable />);

    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });

  it("renders the error state when the API fails", async () => {
    server.use(
      http.get("/api/workshops", () => new HttpResponse(null, { status: 500 }))
    );

    renderWithProviders(<WorkshopsTable />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
