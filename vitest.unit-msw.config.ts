import { mergeConfig } from "vitest/config";
import baseConfig from "./vite.config";

export default mergeConfig(baseConfig, {
  test: {
    include: ["src/tests/unit-msw/**/*.spec.{ts,tsx}"],
    setupFiles: ["./src/tests/unit-msw/setup.ts"],
  },
});
