import { twd, userEvent, screenDom, expect } from "twd-js";
import { describe, it, beforeEach, afterEach } from "twd-js/runner";

const workshopsMock = [
  {
    id: "1",
    name: "VW Center Berlin",
    location: "Berlin, Germany",
    phone: "+49 30 1234567",
  },
  {
    id: "2",
    name: "Autohaus München",
    location: "Munich, Germany",
    phone: "+49 89 9876543",
  },
];

describe("Workshops", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    twd.clearComponentMocks();
  });

  afterEach(() => {
    twd.clearRequestMockRules();
  });

  describe("listing", () => {
    it("should load the workshops list and display all rows", async () => {
      await twd.mockRequest("getWorkshops", {
        method: "GET",
        url: "/api/workshops",
        response: workshopsMock,
        status: 200,
      });

      await twd.visit("/workshops");
      await twd.waitForRequest("getWorkshops");

      twd.should(
        screenDom.getByRole("heading", { name: "Workshops" }),
        "be.visible"
      );

      // 1 header + 2 data rows
      expect(screenDom.getAllByRole("row")).to.have.length(3);
      twd.should(screenDom.getByText("VW Center Berlin"), "be.visible");
      twd.should(screenDom.getByText("Berlin, Germany"), "be.visible");
      twd.should(screenDom.getByText("Autohaus München"), "be.visible");
    });

    it("should display the empty state when there are no workshops", async () => {
      await twd.mockRequest("getWorkshopsEmpty", {
        method: "GET",
        url: "/api/workshops",
        response: [],
        status: 200,
      });

      await twd.visit("/workshops");
      await twd.waitForRequest("getWorkshopsEmpty");

      twd.should(screenDom.getByText(/no results found/i), "be.visible");
    });
  });

  describe("details", () => {
    it("should navigate from the workshops list to a detail page and render contact info", async () => {
      await twd.mockRequest("getWorkshops", {
        method: "GET",
        url: "/api/workshops",
        response: workshopsMock,
        status: 200,
      });
      await twd.mockRequest("getWorkshop", {
        method: "GET",
        url: "/api/workshops/1",
        response: workshopsMock[0],
        status: 200,
      });

      await twd.visit("/workshops");
      await twd.waitForRequest("getWorkshops");

      const user = userEvent.setup();
      await user.click(screenDom.getByText("VW Center Berlin"));

      await twd.waitForRequest("getWorkshop");
      await twd.url().should("contain.url", "/workshops/1");

      twd.should(screenDom.getAllByText("VW Center Berlin")[0], "be.visible");
      twd.should(screenDom.getByText("Berlin, Germany"), "be.visible");
      twd.should(screenDom.getByText("+49 30 1234567"), "be.visible");
      twd.should(screenDom.getByText(/contact information/i), "be.visible");
    });
  });
});
