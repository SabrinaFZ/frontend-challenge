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

function App() {
  const { data, loading, error } = useApp();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Layout>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Engine</TableHead>
              <TableHead>Transmision</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.id}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{formatPrice(car.price)}</TableCell>
                <TableCell>{car.engine}</TableCell>
                <TableCell>{car.transmission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}

export default App;
