import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { DataTable } from "@/features/data-table/DataTable";
import { renderWithProviders } from "../../test-utils";
import { server } from "../../server";

describe("DataTable (MSW)", () => {
  it("fetches and renders the inventory", async () => {
    renderWithProviders(<DataTable />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(screen.getByText("Golf")).toBeInTheDocument();
    expect(screen.getByText("Passat")).toBeInTheDocument();
    expect(screen.getByText("Polo")).toBeInTheDocument();
    expect(screen.getByText("20.000,00 €")).toBeInTheDocument();
  });

  it("renders the empty state when the API returns no cars", async () => {
    server.use(http.get("/api/cars", () => HttpResponse.json([])));

    renderWithProviders(<DataTable />);

    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });

  it("renders the error state when the API fails", async () => {
    server.use(
      http.get("/api/cars", () => new HttpResponse(null, { status: 500 }))
    );

    renderWithProviders(<DataTable />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
