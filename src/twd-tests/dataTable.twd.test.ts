// src/App.twd.test.ts
import { twd, userEvent, screenDom, expect } from "twd-js";
import { beforeEach, describe, it } from "twd-js/runner";
import cars from "./mocks/cars.json";

describe("App Component", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
  });

  it("should render DataTable component", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    const table = await screenDom.findByRole("table");

    twd.should(table, "be.visible");

    const input = screenDom.getByPlaceholderText("Search by text...");
    twd.should(input, "be.visible");

    await userEvent.type(input, "example search");
    twd.should(input, "have.value", "example search");

    const noResults = await screenDom.findByText("No results found");
    twd.should(noResults, "be.visible");
  });

  it("validate error handling", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 500,
      response: [],
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");
    const errorMessage = await screenDom.findByText(
      "Something went wrong. Please try again later."
    );
    twd.should(errorMessage, "be.visible");
  });

  it("should render two rows in the data table", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");
    const rows = await screenDom.findAllByRole("row");
    expect(rows).to.have.length(3); // Including header row
  });

  it("should create a new item in the data table", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.mockRequest("createCar", {
      url: "/api/cars",
      method: "POST",
      status: 201,
      response: {
        id: "42fa",
        model: "New Model",
        year: "2024",
        price: "30000",
        engine: "1.5L TSI",
        transmission: "Manual",
      },
    });
    await twd.mockRequest("deleteCar", {
      url: "/api/cars/42fa",
      method: "DELETE",
      status: 204,
      response: {},
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");
    const addItem = await screenDom.findByRole("button", { name: "Add Item" });
    await userEvent.click(addItem);
    const modelInput = await twd.get('input[name="model"]');
    const yearInput = await twd.get('input[name="year"]');
    const priceInput = await twd.get('input[name="price"]');
    const engineInput = await twd.get('select[name="engine"]');
    const transmissionInput = await twd.get('select[name="transmission"]');

    await userEvent.type(modelInput.el, "New Model");
    await userEvent.type(yearInput.el, "2024");
    await userEvent.type(priceInput.el, "30000");
    await userEvent.selectOptions(engineInput.el, "1.5L TSI");
    await userEvent.selectOptions(transmissionInput.el, "Manual");
    const submitButton = await twd.get('button[type="submit"]');
    await userEvent.click(submitButton.el);
    const rule = await twd.waitForRequest("createCar");
    expect(rule.request).to.deep.equal({
      model: "New Model",
      year: "2024",
      price: "30000",
      engine: "1.5L TSI",
      transmission: "Manual",
    });
    await twd.wait(300);
    const deleteNewItemButton = await screenDom.findByRole("button", {
      name: "Delete New Model",
    });
    await userEvent.click(deleteNewItemButton);

    const confirmDialogTitle = await twd.get("h2");
    confirmDialogTitle.should("have.text", "Confirm");
    const confirmDeleteButton = await twd.get('button[type="submit"]');
    await userEvent.click(confirmDeleteButton.el);
    await twd.waitForRequest("deleteCar");
    const rowsAfterDelete = await screenDom.findAllByRole("row");
    expect(rowsAfterDelete).to.have.length(3); // Back to initial two rows plus header
  });
});
