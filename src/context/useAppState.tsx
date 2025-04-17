import { useState, useCallback } from "react";
import { Car } from "../types/car";

export const useAppState = () => {
  const [data, setData] = useState<Car[]>([]);

  const set = useCallback((newData: Car[]) => {
    console.log("Setting data:", newData);
    setData([...newData]);
  }, []);

  const add = useCallback((item: Car) => {
    console.log("Adding item:", item);
    setData((prevData) => [...prevData, item]);
  }, []);

  return {
    data,
    set,
    add,
  };
};
