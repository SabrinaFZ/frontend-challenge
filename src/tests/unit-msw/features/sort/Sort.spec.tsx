import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import { DataTable } from "@/features/data-table/DataTable";
import { renderWithProviders } from "../../test-utils";

const getDataRowModels = () => {
  // skip the header row (index 0)
  const rows = screen.getAllByRole("row").slice(1);
  return rows.map((row) => within(row).getAllByRole("cell")[1].textContent);
};

describe("Sort inside DataTable (MSW)", () => {
  it("sorts by price descending on first click and ascending on second click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<DataTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    // Default order from the API: Golf, Passat, Polo
    expect(getDataRowModels()).toEqual(["Golf", "Passat", "Polo"]);

    const priceHeader = screen.getByRole("button", { name: /price/i });
    await user.click(priceHeader);

    // Prices: Golf 20000, Passat 32000, Polo 15000 — desc → Passat, Golf, Polo
    expect(getDataRowModels()).toEqual(["Passat", "Golf", "Polo"]);

    await user.click(priceHeader);

    // asc → Polo (15000), Golf (20000), Passat (32000)
    expect(getDataRowModels()).toEqual(["Polo", "Golf", "Passat"]);
  });
});
