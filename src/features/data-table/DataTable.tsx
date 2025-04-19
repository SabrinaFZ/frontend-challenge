import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { formatPrice } from "../../utils/formatPrice";
import { useDataTable } from "./useDataTable";
import { Add } from "../../features/add/Add";
import { Search } from "../../features/search/Search";
import { Delete } from "@/features/delete/Delete";
import { Update } from "@/features/update/Update";
import { Sort } from "@/features/sort/Sort";
import { useNavigate } from "react-router";

export const DataTable = () => {
  const { filteredData, loading, error } = useDataTable();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Add />
        <Search />
      </div>
      <div className="border rounded-md">
        {filteredData?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>
                  <Sort field="model" label="Model" />
                </TableHead>
                <TableHead>
                  <Sort field="year" label="Year" />
                </TableHead>
                <TableHead>
                  <Sort field="price" label="Price" />
                </TableHead>
                <TableHead>
                  <Sort field="engine" label="Engine" />
                </TableHead>
                <TableHead>
                  <Sort field="transmission" label="Transmission" />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((car) => (
                <TableRow
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  key={car.id}
                  onClick={() => handleClick(car.id)}
                  tabIndex={0}
                >
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{formatPrice(Number(car.price))}</TableCell>
                  <TableCell>{car.engine}</TableCell>
                  <TableCell>{car.transmission}</TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-end gap-2">
                      <Delete id={car.id} />
                      <Update car={car} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">No results found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DataTable;
