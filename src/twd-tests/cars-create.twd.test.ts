import { twd, userEvent, screenDom, screenDomGlobal, expect } from "twd-js";
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
];

const createdCar = {
  id: "99",
  model: "Tiguan",
  year: "2024",
  price: "35000",
  engine: "2.0L TSI",
  transmission: "Automatic",
};

describe("Cars Create", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    twd.clearComponentMocks();
  });

  afterEach(() => {
    twd.clearRequestMockRules();
  });

  it("should open the Add dialog, fill the form, submit, and show the new car in the list", async () => {
    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });
    await twd.mockRequest("createCar", {
      method: "POST",
      url: "/api/cars",
      response: createdCar,
      status: 201,
    });

    await twd.visit("/");
    await twd.waitForRequest("getCars");

    const user = userEvent.setup();
    await user.click(screenDom.getByRole("button", { name: /add item/i }));

    // Dialog opens in a portal
    const dialog = await screenDomGlobal.findByRole("dialog");
    twd.should(dialog, "be.visible");
    twd.should(
      screenDomGlobal.getByRole("heading", { name: /add new item/i }),
      "be.visible"
    );

    // Fill text inputs
    await user.type(screenDomGlobal.getByLabelText("Model"), "Tiguan");
    await user.type(screenDomGlobal.getByLabelText("Year"), "2024");
    await user.type(screenDomGlobal.getByLabelText("Price"), "35000");

    // Engine select — Radix Select portal
    await user.click(screenDomGlobal.getByLabelText("Engine Type"));
    const engineOption = await screenDomGlobal.findByRole("option", {
      name: "2.0L TSI",
    });
    await user.click(engineOption);

    // Transmission select
    await user.click(screenDomGlobal.getByLabelText("Transmission"));
    const transmissionOption = await screenDomGlobal.findByRole("option", {
      name: "Automatic",
    });
    await user.click(transmissionOption);

    // Submit
    await user.click(screenDomGlobal.getByRole("button", { name: /save/i }));

    const rule = await twd.waitForRequest("createCar");
    expect(rule.request).to.deep.equal({
      model: "Tiguan",
      year: "2024",
      price: "35000",
      engine: "2.0L TSI",
      transmission: "Automatic",
    });

    // After submit, dialog closes and the new car appears in the list
    await twd.waitFor(() => {
      expect(screenDom.queryByRole("dialog")).to.equal(null);
    });

    twd.should(screenDom.getByText("Tiguan"), "be.visible");
  });

  it("should keep the Save button disabled while required fields are missing", async () => {
    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });

    await twd.visit("/");
    // The list may already be hydrated from a previous test (same URL → no
    // remount in TWD). Wait for the Add button instead of the GET request.
    const addButton = await screenDom.findByRole("button", {
      name: /add item/i,
    });

    const user = userEvent.setup();
    await user.click(addButton);

    await screenDomGlobal.findByRole("dialog");

    // Save is disabled with an empty form
    twd.should(
      screenDomGlobal.getByRole("button", { name: /save/i }),
      "be.disabled"
    );

    // Fill some but not all fields — still disabled
    await user.type(screenDomGlobal.getByLabelText("Model"), "T-Cross");
    await user.type(screenDomGlobal.getByLabelText("Year"), "2024");

    twd.should(
      screenDomGlobal.getByRole("button", { name: /save/i }),
      "be.disabled"
    );
  });

  it("should close the dialog without creating a car when Cancel is clicked", async () => {
    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });
    await twd.mockRequest("createCar", {
      method: "POST",
      url: "/api/cars",
      response: createdCar,
      status: 201,
    });

    await twd.visit("/");
    await twd.waitForRequest("getCars");

    const user = userEvent.setup();
    await user.click(screenDom.getByRole("button", { name: /add item/i }));

    await screenDomGlobal.findByRole("dialog");

    await user.type(screenDomGlobal.getByLabelText("Model"), "Polo");
    await user.click(screenDomGlobal.getByRole("button", { name: /cancel/i }));

    await twd.waitFor(() => {
      expect(screenDom.queryByRole("dialog")).to.equal(null);
    });

    // No POST was made
    expect(twd.getRequestCount("createCar")).to.equal(0);
    // Original row still there, Polo was not added
    twd.should(screenDom.getByText("Amarok"), "be.visible");
    expect(screenDom.queryByText("Polo")).to.equal(null);
  });
});
