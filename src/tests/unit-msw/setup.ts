import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { server } from "./server";
import { resetDb } from "./handlers";

// Radix UI components rely on pointer-event APIs that jsdom does not implement.
// These shims keep <Select> and <Dialog> usable inside Vitest.
if (typeof window !== "undefined") {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

beforeEach(() => {
  resetDb();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
