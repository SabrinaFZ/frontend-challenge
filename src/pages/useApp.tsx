import { useEffect, useState } from "react";
import axios from "axios";
import { Car } from "../types/car";

export const useApp = () => {
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Car[]>("http://localhost:3001/data");
      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
