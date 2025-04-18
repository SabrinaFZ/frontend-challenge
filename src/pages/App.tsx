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
import { Add } from "./features/add/Add";
import { Search } from "./features/search/Search";

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
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Engine</TableHead>
                <TableHead>Transmission</TableHead>
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
