import { AppProvider } from "./context/AppContext.tsx";
import { Layout } from "./components/common/Layout.tsx";
import { Loading } from "./components/common/Loading.tsx";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const App = lazy(() => import("./pages/App.tsx"));
const Details = lazy(() => import("./pages/Details.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

export const AppRoutes = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
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
  );
}