import { useState, useEffect } from "react";
import { useAppContext } from "@/context/useAppContext";

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const { filter } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      filter(searchTerm);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, filter]);

  return {
    loading,
    searchTerm,
    setSearchTerm,
  };
};
