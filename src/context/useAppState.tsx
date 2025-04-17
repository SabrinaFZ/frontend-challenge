import { useState, useCallback } from "react";
import { Car } from "../types/car";

export const useAppState = () => {
  const [data, setData] = useState<Car[]>([]);

  const set = useCallback((newData: Car[]) => {
    setData([...newData]);
  }, []);

  const add = useCallback((item: Car) => {
    setData((prevData) => [...prevData, item]);
  }, []);

  return {
    data,
    set,
    add,
  };
};
