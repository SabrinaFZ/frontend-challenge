import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { formatPrice } from "../utils/formatPrice";
import { useApp } from "./useApp";
import Layout from "../components/common/Layout";
import { Add } from "../features/add/Add";
import { Search } from "../features/search/Search";
import { Delete } from "@/features/delete/Delete";
import { Update } from "@/features/update/Update";
import { Sort } from "@/features/sort/Sort";

function App() {
  const { filteredData, loading, error } = useApp();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
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
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{formatPrice(Number(car.price))}</TableCell>
                  <TableCell>{car.engine}</TableCell>
                  <TableCell>{car.transmission}</TableCell>
                  <TableCell className="text-right">
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
    </Layout>
  );
}

export default App;
