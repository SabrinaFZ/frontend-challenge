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
  {
    id: "2",
    model: "Arteon",
    year: "2023",
    price: "26100",
    engine: "1.5L TSI",
    transmission: "Manual",
  },
];

describe("Cars Update", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    twd.clearComponentMocks();
  });

  afterEach(() => {
    twd.clearRequestMockRules();
  });

  it("should open the Edit dialog with current values, save changes, and reflect them in the list", async () => {
    const updatedCar = {
      id: "1",
      model: "Amarok Updated",
      year: "2025",
      price: "28249.64",
      engine: "1.5L TSI",
      transmission: "Manual",
    };

    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });
    await twd.mockRequest("updateCar", {
      method: "PUT",
      url: "/api/cars/1",
      response: updatedCar,
      status: 200,
    });

    await twd.visit("/");
    await twd.waitForRequest("getCars");

    const user = userEvent.setup();

    // There are two Edit buttons (one per row). The first corresponds to id 1.
    const editButtons = screenDom.getAllByRole("button", { name: /edit/i });
    await user.click(editButtons[0]);

    const dialog = await screenDomGlobal.findByRole("dialog");
    twd.should(dialog, "be.visible");
    twd.should(
      screenDomGlobal.getByRole("heading", { name: /update item/i }),
      "be.visible"
    );

    // Form is pre-filled with current values
    twd.should(screenDomGlobal.getByLabelText("Model"), "have.value", "Amarok");
    twd.should(screenDomGlobal.getByLabelText("Year"), "have.value", "2025");

    // Edit the model
    const modelInput = screenDomGlobal.getByLabelText("Model");
    await user.clear(modelInput);
    await user.type(modelInput, "Amarok Updated");

    // Change transmission via the Radix select
    await user.click(screenDomGlobal.getByLabelText("Transmission"));
    const manualOption = await screenDomGlobal.findByRole("option", {
      name: "Manual",
    });
    await user.click(manualOption);

    await user.click(screenDomGlobal.getByRole("button", { name: /save/i }));

    const rule = await twd.waitForRequest("updateCar");
    expect(rule.request).to.deep.equal({
      id: "1",
      model: "Amarok Updated",
      year: "2025",
      price: "28249.64",
      engine: "1.5L TSI",
      transmission: "Manual",
    });

    await twd.waitFor(() => {
      expect(screenDom.queryByRole("dialog")).to.equal(null);
    });

    twd.should(screenDom.getByText("Amarok Updated"), "be.visible");
  });

  it("should not call the API and keep the original value when Cancel is clicked", async () => {
    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });
    await twd.mockRequest("updateCar", {
      method: "PUT",
      url: "/api/cars/1",
      response: carsMock[0],
      status: 200,
    });

    await twd.visit("/");
    await twd.waitForRequest("getCars");

    const user = userEvent.setup();
    const editButtons = screenDom.getAllByRole("button", { name: /edit/i });
    await user.click(editButtons[0]);

    await screenDomGlobal.findByRole("dialog");

    // Type something but cancel
    const modelInput = screenDomGlobal.getByLabelText("Model");
    await user.clear(modelInput);
    await user.type(modelInput, "Should Not Save");

    await user.click(screenDomGlobal.getByRole("button", { name: /cancel/i }));

    await twd.waitFor(() => {
      expect(screenDom.queryByRole("dialog")).to.equal(null);
    });

    expect(twd.getRequestCount("updateCar")).to.equal(0);
    twd.should(screenDom.getByText("Amarok"), "be.visible");
    expect(screenDom.queryByText("Should Not Save")).to.equal(null);
  });
});
