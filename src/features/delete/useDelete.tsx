import { useCallback, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/useAppContext";

export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { remove } = useAppContext();

  const deleteItem = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        await axios.delete(`/api/cars/${id}`);
        remove(id);
      } catch (err) {
        console.error("Error deleting item:", err);
        setError(
          (err as Error).message || "An error occurred while deleting the item"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [remove]
  );

  return {
    deleteItem,
    loading,
    error,
  };
};
