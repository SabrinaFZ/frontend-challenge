import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { DataTable } from "@/features/data-table/DataTable";
import { renderWithProviders } from "../../test-utils";

describe("Add inside DataTable (MSW)", () => {
  it("disables Save until every field is filled, then creates a new row", async () => {
    const user = userEvent.setup();
    renderWithProviders(<DataTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    await user.click(screen.getByRole("button", { name: /add item/i }));

    const saveButton = await screen.findByRole("button", { name: /^save$/i });
    expect(saveButton).toBeDisabled();

    await user.type(screen.getByPlaceholderText(/enter model/i), "Tiguan");
    await user.type(screen.getByPlaceholderText(/enter year/i), "2024");
    await user.type(screen.getByPlaceholderText(/enter price/i), "45000");

    await user.click(screen.getByRole("combobox", { name: /engine type/i }));
    await user.click(await screen.findByRole("option", { name: "2.0L TSI" }));

    await user.click(screen.getByRole("combobox", { name: /transmission/i }));
    await user.click(await screen.findByRole("option", { name: "Automatic" }));

    expect(saveButton).toBeEnabled();
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Tiguan")).toBeInTheDocument();
    });
    expect(screen.getByText("45.000,00 €")).toBeInTheDocument();
  });
});
