import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSort } from "./useSort";
import { Car } from "@/types/car";

export const Sort = ({ field, label }: { field: keyof Car; label: string }) => {
  const { handleSort } = useSort();

  return (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="flex items-center gap-2"
      size="noPadding"
    >
      {label}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
};
