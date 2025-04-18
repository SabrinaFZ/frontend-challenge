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

  const remove = useCallback((id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
  }, []);

  const update = useCallback((id: string, updatedItem: Car) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? updatedItem : item))
    );
    setFilteredData((prevData) =>
      prevData.map((item) => (item.id === id ? updatedItem : item))
    );
  }, []);

  const sort = useCallback(
    (field: keyof Car, order: "asc" | "desc" = "asc") => {
      setFilteredData((prevFilteredData) => {
        const sortedData = [...prevFilteredData].sort((a, b) => {
          const aValue = !isNaN(Number(a[field]))
            ? Number(a[field])
            : String(a[field]);
          const bValue = !isNaN(Number(b[field]))
            ? Number(b[field])
            : String(b[field]);

          if (aValue < bValue) return order === "asc" ? -1 : 1;
          if (aValue > bValue) return order === "asc" ? 1 : -1;
          return 0;
        });
        return sortedData;
      });
    },
    []
  );

  return {
    filteredData,
    set,
    add,
    filter,
    remove,
    update,
    sort,
  };
};
