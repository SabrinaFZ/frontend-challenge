import { vi } from "vitest";

// Scoped to the unit-mocks-axios suite only.
// The MSW suite will define its own setup (no axios/context mocks).
vi.mock("axios");
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));
