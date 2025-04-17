import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mocks
vi.mock("axios");
vi.mock("@/context/useAppContext", () => ({
  useAppContext: vi.fn(),
}));
