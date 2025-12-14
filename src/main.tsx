import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./App.tsx";

if (import.meta.env.DEV) {
  const { initTWD } = await import("twd-js/bundled");
  const tests = import.meta.glob("./**/*.twd.test.ts");

  // Initialize TWD with tests and optional configuration
  // Request mocking is automatically initialized by default
  initTWD(tests, {
    open: true,
    position: "left",
    serviceWorker: true, // Enable request mocking (default: true)
    serviceWorkerUrl: "/mock-sw.js", // Custom service worker path (default: '/mock-sw.js')
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
