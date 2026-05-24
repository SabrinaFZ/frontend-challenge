import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { DataTable } from "@/features/data-table/DataTable";
import { renderWithProviders } from "../../test-utils";

describe("Search inside DataTable (MSW)", () => {
  it("filters the table rows after typing into the search box", async () => {
    const user = userEvent.setup();
    renderWithProviders(<DataTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(screen.getByText("Golf")).toBeInTheDocument();
    expect(screen.getByText("Passat")).toBeInTheDocument();
    expect(screen.getByText("Polo")).toBeInTheDocument();

    await user.type(
      screen.getByPlaceholderText("Search by text..."),
      "Passat"
    );

    // The search hook debounces by 300ms before applying the filter.
    await waitFor(() => {
      expect(screen.queryByText("Golf")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Passat")).toBeInTheDocument();
    expect(screen.queryByText("Polo")).not.toBeInTheDocument();
  });

  it("restores all rows when the search box is cleared", async () => {
    const user = userEvent.setup();
    renderWithProviders(<DataTable />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const input = screen.getByPlaceholderText("Search by text...");
    await user.type(input, "Polo");
    await waitFor(() => {
      expect(screen.queryByText("Golf")).not.toBeInTheDocument();
    });

    await user.clear(input);

    await waitFor(() => {
      expect(screen.getByText("Golf")).toBeInTheDocument();
    });
    expect(screen.getByText("Passat")).toBeInTheDocument();
    expect(screen.getByText("Polo")).toBeInTheDocument();
  });
});
