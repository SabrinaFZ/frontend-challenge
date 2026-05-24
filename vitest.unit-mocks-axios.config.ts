import { mergeConfig } from "vitest/config";
import baseConfig from "./vite.config";

export default mergeConfig(baseConfig, {
  test: {
    include: ["src/tests/unit-mocks-axios/**/*.spec.{ts,tsx}"],
    setupFiles: [
      "./src/test/setup.ts",
      "./src/tests/unit-mocks-axios/setup.ts",
    ],
  },
});
