// When writing actual tests, expand the imports as needed:
//   import { twd, userEvent, screenDom, expect } from "twd-js";
// `screenDomGlobal` is the equivalent of `screenDom` for elements inside portals
// (Radix Dialog / Select). See .claude/twd-patterns.md.
import { twd } from "twd-js";
import { describe, it, beforeEach, afterEach } from "twd-js/runner";

describe("App Smoke Test", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    twd.clearComponentMocks();
  });

  afterEach(() => {
    twd.clearRequestMockRules();
  });

  it("renders the home page", async () => {
    // Use the /twd skill to write actual test content
  });
});
