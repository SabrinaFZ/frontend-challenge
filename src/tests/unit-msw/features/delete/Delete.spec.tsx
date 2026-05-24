import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { DataTable } from "@/features/data-table/DataTable";
import { renderWithProviders } from "../../test-utils";
import { server } from "../../server";

describe("Delete inside DataTable (MSW)", () => {
  it("deletes a row end-to-end through the dialog confirm flow", async () => {
    const user = userEvent.setup();
    renderWithProviders(<DataTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    expect(screen.getByText("Golf")).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    const confirmButton = await screen.findByRole("button", {
      name: /^delete$/i,
    });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(screen.queryByText("Golf")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Passat")).toBeInTheDocument();
    expect(screen.getByText("Polo")).toBeInTheDocument();
  });

  it("shows an error message when the delete request fails", async () => {
    server.use(
      http.delete(
        "/api/cars/:id",
        () => new HttpResponse(null, { status: 500 })
      )
    );

    const user = userEvent.setup();
    renderWithProviders(<DataTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    const confirmButton = await screen.findByRole("button", {
      name: /^delete$/i,
    });
    await user.click(confirmButton);

    expect(
      await screen.findByText(/request failed with status code 500/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Golf")).toBeInTheDocument();
  });
});
