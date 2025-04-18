import { useAppContext } from "@/context/useAppContext";
import { Car } from "@/types/car";
import { useState } from "react";

export const useSort = () => {
  const { sort } = useAppContext();
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>(
    {
      model: "asc",
      year: "asc",
      price: "asc",
      engine: "asc",
      transmission: "asc",
    }
  );

  const handleSort = (field: keyof Car) => {
    const order = sortOrder[field] === "asc" ? "desc" : "asc";
    setSortOrder(
      (prev) =>
        ({ ...prev, [field]: order } as { [key: string]: "asc" | "desc" })
    );
    sort(field, order);
  };

  return {
    handleSort,
  };
};
