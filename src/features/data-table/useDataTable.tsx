import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Car } from "../../types/car";
import { useAppContext } from "@/context/useAppContext";

export const useDataTable = () => {
  const { filteredData, set } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Car[]>("http://localhost:3001/data");
      set(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [set]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { filteredData, loading, error };
};
