import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Workshop } from "@/types/workshop";

export const useWorkshopDetails = (id: string | undefined) => {
  const [data, setData] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Workshop>(`/api/workshops/${id}`);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
