import { useState, useCallback } from "react";
import { Car } from "../types/car";

export const useAppState = () => {
  const [data, setData] = useState<Car[]>([]);
  const [filteredData, setFilteredData] = useState<Car[]>([]);

  const set = useCallback((newData: Car[]) => {
    setData([...newData]);
    setFilteredData([...newData]);
  }, []);

  const add = useCallback((item: Car) => {
    setData((prevData) => [...prevData, item]);
  }, []);

  const filter = useCallback(
    (searchTerm: string) => {
      if (searchTerm.trim() === "") {
        setFilteredData(data);
        return;
      }
      const filtered = data.filter(
        (item) =>
          item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.transmission.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.year.toString().includes(searchTerm) ||
          item.engine.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.price.toString().includes(searchTerm)
      );
      setFilteredData(filtered);
    },
    [data]
  );

  return {
    filteredData,
    set,
    add,
    filter,
  };
};
