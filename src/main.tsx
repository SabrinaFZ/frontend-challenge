import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import App from "./pages/App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import Layout from "./components/common/Layout.tsx";
import { Details } from "./pages/Details.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<App />} />
            <Route path="details">
              <Route index element={<Navigate to="/" replace />} />
              <Route path=":id">
                <Route index element={<Details />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
