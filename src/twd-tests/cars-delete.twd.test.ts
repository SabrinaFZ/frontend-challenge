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

describe("Cars Delete", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    twd.clearComponentMocks();
  });

  afterEach(() => {
    twd.clearRequestMockRules();
  });

  it("should open the confirm dialog, delete the car, and remove the row from the list", async () => {
    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });
    await twd.mockRequest("deleteCar", {
      method: "DELETE",
      url: "/api/cars/1",
      response: {},
      status: 200,
    });

    await twd.visit("/");
    await twd.waitForRequest("getCars");

    const user = userEvent.setup();

    // First Delete button targets id 1
    const deleteButtons = screenDom.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    const dialog = await screenDomGlobal.findByRole("dialog");
    twd.should(dialog, "be.visible");
    twd.should(
      screenDomGlobal.getByRole("heading", { name: /confirm/i }),
      "be.visible"
    );
    twd.should(dialog, "contain.text", "with id 1");

    // Confirm — the second Delete button inside the dialog
    const dialogDeleteButton = screenDomGlobal.getAllByRole("button", {
      name: /delete/i,
    });
    // The button inside the dialog is the destructive one; pick the last match
    // since the trigger button still exists in the row.
    await user.click(dialogDeleteButton[dialogDeleteButton.length - 1]);

    await twd.waitForRequest("deleteCar");

    await twd.waitFor(() => {
      expect(screenDom.queryByRole("dialog")).to.equal(null);
    });

    // Amarok row is gone, Arteon remains
    expect(screenDom.queryByText("Amarok")).to.equal(null);
    twd.should(screenDom.getByText("Arteon"), "be.visible");
  });

  it("should close the dialog without calling DELETE when Cancel is clicked", async () => {
    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });
    await twd.mockRequest("deleteCar", {
      method: "DELETE",
      url: "/api/cars/1",
      response: {},
      status: 200,
    });

    await twd.visit("/");
    await twd.waitForRequest("getCars");

    const user = userEvent.setup();
    const deleteButtons = screenDom.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    await screenDomGlobal.findByRole("dialog");

    await user.click(screenDomGlobal.getByRole("button", { name: /cancel/i }));

    await twd.waitFor(() => {
      expect(screenDom.queryByRole("dialog")).to.equal(null);
    });

    expect(twd.getRequestCount("deleteCar")).to.equal(0);
    twd.should(screenDom.getByText("Amarok"), "be.visible");
    twd.should(screenDom.getByText("Arteon"), "be.visible");
  });
});
