import "@testing-library/jest-dom";
import { vi } from "vitest";

// Scoped to the unit-mocks-axios suite only.
// The MSW suite has its own setup that exercises real HTTP via MSW.
vi.mock("axios");
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));
