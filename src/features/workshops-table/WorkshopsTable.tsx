import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useWorkshopsTable } from "./useWorkshopsTable";
import { useNavigate } from "react-router";
import { Loading } from "@/components/common/Loading";
import { Error } from "@/components/common/Error";

export const WorkshopsTable = () => {
  const { data, loading, error } = useWorkshopsTable();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/workshops/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="border rounded-md">
      {data?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((workshop) => (
              <TableRow
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                key={workshop.id}
                onClick={() => handleClick(workshop.id)}
                tabIndex={0}
              >
                <TableCell>{workshop.id}</TableCell>
                <TableCell>{workshop.name}</TableCell>
                <TableCell>{workshop.location}</TableCell>
                <TableCell>{workshop.phone}</TableCell>
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
  );
};
