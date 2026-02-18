import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Workshop } from "@/types/workshop";

export const useWorkshopsTable = () => {
  const [data, setData] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Workshop[]>("/api/workshops");
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
