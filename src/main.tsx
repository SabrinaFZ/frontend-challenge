import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import { AppProvider } from "./context/AppContext.tsx";
import Layout from "./components/common/Layout.tsx";

const App = lazy(() => import("./pages/App.tsx"));
const Details = lazy(() => import("./pages/Details.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<App />} />
              <Route path="details">
                <Route index element={<Navigate to="/" replace />} />
                <Route path=":id">
                  <Route index element={<Details />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
