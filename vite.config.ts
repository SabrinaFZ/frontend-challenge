import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { configDefaults, coverageConfigDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
        "functions/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/components/ui/**",
        "src/lib/**",
        "src/pages/**",
        "src/tests/**",
        "src/types/**",
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
