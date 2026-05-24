import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppProvider } from "@/context/AppContext";

type Options = Omit<RenderOptions, "wrapper"> & {
  route?: string;
};

export const renderWithProviders = (
  ui: ReactElement,
  { route = "/", ...options }: Options = {}
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AppProvider>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </AppProvider>
    ),
    ...options,
  });
};

export * from "@testing-library/react";
