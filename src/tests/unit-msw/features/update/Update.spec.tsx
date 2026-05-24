import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { DataTable } from "@/features/data-table/DataTable";
import { renderWithProviders } from "../../test-utils";

describe("Update inside DataTable (MSW)", () => {
  it("edits a car end-to-end through the dialog form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<DataTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    expect(screen.getByText("Golf")).toBeInTheDocument();

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    await user.click(editButtons[0]);

    const modelInput = await screen.findByPlaceholderText(/enter model/i);
    await user.clear(modelInput);
    await user.type(modelInput, "Tiguan");

    await user.click(screen.getByRole("button", { name: /^save$/i }));

    await waitFor(() => {
      expect(screen.getByText("Tiguan")).toBeInTheDocument();
    });
    expect(screen.queryByText("Golf")).not.toBeInTheDocument();
  });
});
