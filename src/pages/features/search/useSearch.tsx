import { useState, useEffect } from "react";
import { useAppContext } from "@/context/useAppContext";

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const { filter } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      filter(searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, filter]);

  return {
    searchTerm,
    setSearchTerm,
  };
};
