import React, { createContext } from "react";
import { useAppState } from "./useAppState";
import { Car } from "@/types/car";

export interface AppContextType {
  filteredData: Car[];
  add: (item: Car) => void;
  set: (newData: Car[]) => void;
  filter: (searchTerm: string) => void;
  remove: (id: string) => void;
  update: (id: string, updatedItem: Car) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appState = useAppState();

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
