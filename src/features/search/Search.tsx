import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useSearch } from "./useSearch";

export const Search = () => {
  const { searchTerm, setSearchTerm, loading } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative flex-grow">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by text..."
        className="pl-8"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {loading && (
        <p className="text-sm text-muted-foreground mt-1">Searching</p>
      )}
    </div>
  );
};
