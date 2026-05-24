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
];

const carDetail = carsMock[0];

describe("Car Details", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    twd.clearComponentMocks();
  });

  afterEach(() => {
    twd.clearRequestMockRules();
  });

  it("should load the details page and render the car specifications", async () => {
    await twd.mockRequest("getCar", {
      method: "GET",
      url: "/api/cars/1",
      response: carDetail,
      status: 200,
    });

    await twd.visit("/details/1");
    await twd.waitForRequest("getCar");

    twd.should(screenDom.getByText("Amarok"), "be.visible");
    twd.should(screenDom.getByText("2025 Model"), "be.visible");
    twd.should(screenDom.getByText("1.5L TSI"), "be.visible");
    twd.should(screenDom.getByText("Automatic"), "be.visible");
    twd.should(screenDom.getByText(/specifications/i), "be.visible");
  });

  it("should navigate from the car list to a detail page when a row is clicked", async () => {
    await twd.mockRequest("getCars", {
      method: "GET",
      url: "/api/cars",
      response: carsMock,
      status: 200,
    });
    await twd.mockRequest("getCar", {
      method: "GET",
      url: "/api/cars/1",
      response: carDetail,
      status: 200,
    });

    await twd.visit("/");
    await twd.waitForRequest("getCars");

    const user = userEvent.setup();
    await user.click(screenDom.getByText("Amarok"));

    await twd.waitForRequest("getCar");
    await twd.url().should("contain.url", "/details/1");

    twd.should(screenDom.getByText("2025 Model"), "be.visible");
    expect(twd.getRequestCount("getCar")).to.be.greaterThan(0);
  });
});
