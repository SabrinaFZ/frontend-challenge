// src/App.twd.test.ts
import { twd, userEvent, screenDom, expect } from "twd-js";
import { beforeEach, describe, it } from "twd-js/runner";
import cars from "./mocks/cars.json";

describe("App Component", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
  });

  const getColumnValues = async (colIndex: number) => {
    const rows = await screenDom.findAllByRole("row");
    return rows.slice(1).map((row) => {
      const cells = row.querySelectorAll("td");
      const cell = cells[colIndex];
      return cell?.textContent?.trim() || "";
    });
  };

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

  it("should update an existing item in the data table", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.mockRequest("updateCar", {
      url: "/api/cars/1",
      method: "PUT",
      status: 200,
      response: {
        id: "1",
        model: "Amarok Updated",
        year: "2026",
        price: "29999.99",
        engine: "2.0L TSI",
        transmission: "Automatic",
      },
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");
    const editButton = await screenDom.findByRole("button", { name: "Edit Amarok" });
    await userEvent.click(editButton);

    const modelInput = await twd.get('input[name="model"]');
    const yearInput = await twd.get('input[name="year"]');
    const priceInput = await twd.get('input[name="price"]');
    const engineInput = await twd.get('select[name="engine"]');
    const transmissionInput = await twd.get('select[name="transmission"]');

    // Clear and update form fields
    await userEvent.clear(modelInput.el);
    await userEvent.type(modelInput.el, "Amarok Updated");
    
    await userEvent.clear(yearInput.el);
    await userEvent.type(yearInput.el, "2026");
    
    await userEvent.clear(priceInput.el);
    await userEvent.type(priceInput.el, "29999.99");
    
    await userEvent.selectOptions(engineInput.el, "2.0L TSI");
    await userEvent.selectOptions(transmissionInput.el, "Automatic");

    const submitButton = await twd.get('button[type="submit"]');
    await userEvent.click(submitButton.el);

    const rule = await twd.waitForRequest("updateCar");
    expect(rule.request).to.deep.equal({
      id: "1",
      model: "Amarok Updated",
      year: "2026",
      price: "29999.99",
      engine: "2.0L TSI",
      transmission: "Automatic",
    });
  });

  it("should handle update error gracefully", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.mockRequest("updateCar", {
      url: "/api/cars/1",
      method: "PUT",
      status: 500,
      response: { error: "Server error" },
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");

    const editButton = await screenDom.findByRole("button", { name: "Edit Amarok" });
    await userEvent.click(editButton);

    const modelInput = await twd.get('input[name="model"]');
    await userEvent.clear(modelInput.el);
    await userEvent.type(modelInput.el, "Updated Model");

    const submitButton = await twd.get('button[type="submit"]');
    await userEvent.click(submitButton.el);

    await twd.waitForRequest("updateCar");
  });

  it("should sort data by model column in descending order", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");

    // Get all model cells before sorting
    const modelHeaderButton = await screenDom.findByRole("button", {
      name: /Model/i,
    });
    await userEvent.click(modelHeaderButton);
    await twd.wait(300);

    const modelValues = await getColumnValues(1);
    expect(modelValues).to.deep.equal(["Arteon", "Amarok"]);
  });

  it("should sort data by model column in ascending order on second click", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");

    const modelHeaderButton = await screenDom.findByRole("button", {
      name: /Model/i,
    });
    // First click - ascending
    await userEvent.click(modelHeaderButton);
    await twd.wait(100);
    // Second click - descending
    await userEvent.click(modelHeaderButton);
    await twd.wait(300);

    const modelValues = await getColumnValues(1);
    expect(modelValues).to.deep.equal(["Amarok", "Arteon"]);
  });

  it("should sort data by year column", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");

    const yearHeaderButton = await screenDom.findByRole("button", {
      name: /Year/i,
    });
    await userEvent.click(yearHeaderButton);
    await twd.wait(100);

    const yearValues = await getColumnValues(2);
    expect(yearValues).to.deep.equal(["2025", "2023"]);
  });

  it("should sort data by price column", async () => {
    await twd.mockRequest("fetchCars", {
      url: "/api/cars",
      method: "GET",
      status: 200,
      response: cars,
    });
    await twd.visit("/not-found/page");
    await twd.visit("/");
    await twd.waitForRequest("fetchCars");

    const priceHeaderButton = await screenDom.findByRole("button", {
      name: /Price/i,
    });
    await userEvent.click(priceHeaderButton);
    await twd.wait(100);

    const priceValues = await getColumnValues(3);
    expect(priceValues.length).to.equal(2);
    const price1 = parseFloat(priceValues[0].replace(/[$,]/g, ""));
    const price2 = parseFloat(priceValues[1].replace(/[$,]/g, ""));
    expect(price1).to.be.greaterThan(price2);
  });
});
