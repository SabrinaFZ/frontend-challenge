import { twd, userEvent, screenDom, expect } from "twd-js";
import { describe, it, beforeEach, afterEach } from "twd-js/runner";

const carsMock = [
  {
    id: "1",
    model: "Amarok",
    year: "2025",
    price: "28249.64",
    engine: "1.5L TSI",
    transmission: "Automatic",
  },
  {
    id: "2",
    model: "Arteon",
    year: "2023",
    price: "26100",
    engine: "1.5L TSI",
    transmission: "Manual",
  },
  {
    id: "3",
    model: "Golf GTI",
    year: "2021",
    price: "20857.99",
    engine: "2.0L TDI",
    transmission: "Single-speed",
  },
];

describe("Cars List", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    twd.clearComponentMocks();
  });

  afterEach(() => {
    twd.clearRequestMockRules();
  });

  describe("listing", () => {
    it("should load the car inventory and display all rows with their data", async () => {
      await twd.mockRequest("getCars", {
        method: "GET",
        url: "/api/cars",
        response: carsMock,
        status: 200,
      });

      await twd.visit("/");
      await twd.waitForRequest("getCars");

      twd.should(
        screenDom.getByRole("heading", { name: "Car Inventory" }),
        "be.visible"
      );

      // 1 header row + 3 data rows
      expect(screenDom.getAllByRole("row")).to.have.length(4);
      twd.should(screenDom.getByText("Amarok"), "be.visible");
      twd.should(screenDom.getByText("Arteon"), "be.visible");
      twd.should(screenDom.getByText("Golf GTI"), "be.visible");
    });

    it("should display the empty state when there are no cars", async () => {
      await twd.mockRequest("getCarsEmpty", {
        method: "GET",
        url: "/api/cars",
        response: [],
        status: 200,
      });

      await twd.visit("/");
      await twd.waitForRequest("getCarsEmpty");

      twd.should(screenDom.getByText(/no results found/i), "be.visible");
    });
  });

  describe("search and sort", () => {
    it("should filter rows when typing in the search box", async () => {
      await twd.mockRequest("getCars", {
        method: "GET",
        url: "/api/cars",
        response: carsMock,
        status: 200,
      });

      await twd.visit("/");
      await twd.waitForRequest("getCars");

      const user = userEvent.setup();
      const search = screenDom.getByPlaceholderText(/search by text/i);

      await user.type(search, "Amarok");

      // search has 300ms debounce — wait for the filter to apply
      await twd.waitFor(() => {
        const rows = screenDom.getAllByRole("row");
        // 1 header + 1 filtered row
        expect(rows).to.have.length(2);
      });

      twd.should(screenDom.getByText("Amarok"), "be.visible");
      expect(screenDom.queryByText("Arteon")).to.equal(null);
      expect(screenDom.queryByText("Golf GTI")).to.equal(null);
    });

    it("should sort rows by year when the Year header is clicked", async () => {
      await twd.mockRequest("getCars", {
        method: "GET",
        url: "/api/cars",
        response: carsMock,
        status: 200,
      });

      await twd.visit("/");
      await twd.waitForRequest("getCars");

      const user = userEvent.setup();
      const yearSortButton = screenDom.getByRole("button", { name: /^year$/i });

      // First click flips state to "desc" → 2025, 2023, 2021 (same as initial order)
      await user.click(yearSortButton);
      // Second click flips to "asc" → 2021, 2023, 2025
      await user.click(yearSortButton);

      await twd.waitFor(() => {
        const rows = screenDom.getAllByRole("row");
        expect(rows[1].textContent || "").to.contain("Golf GTI");
      });

      // Third click → desc again → 2025, 2023, 2021
      await user.click(yearSortButton);

      await twd.waitFor(() => {
        const rows = screenDom.getAllByRole("row");
        expect(rows[1].textContent || "").to.contain("Amarok");
      });
    });
  });
});
