import path from "path";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { twd } from "twd-js/vite-plugin";
import { twdRemote } from "twd-relay/vite";
import istanbul from "vite-plugin-istanbul";
import { configDefaults, coverageConfigDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    twd({
      testFilePattern: "/**/*.twd.test.{ts,tsx}",
      open: true,
      position: "left",
    }),
    twdRemote() as PluginOption,
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "**/*.twd.test.ts"],
      requireEnv: !process.env.CI,
      extension: [".ts", ".tsx"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        // Vitest's defaults catch vite.config.ts and vitest.workspace.ts,
        // but not custom-named configs like vitest.unit-msw.config.ts.
        "**/*.config.*",
        // Cloudflare Pages Functions — deployed separately, not part of
        // the React app under test.
        "functions/**",
        // Test infrastructure (handlers, server, fixtures, setup, test-utils).
        // Spec files are already excluded by the default test glob.
        "src/tests/**",
      ],
    },
  },
  server: {
    watch: {
      ignored: ["**/data/db.json"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
