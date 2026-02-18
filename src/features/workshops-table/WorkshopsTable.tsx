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
    <>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#001e50]">Workshops</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Authorized Volkswagen service centers
        </p>
      </div>
      <div className="border rounded-md">
        {data?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Id
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Name
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Location
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Phone
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((workshop) => (
                <TableRow
                  className="cursor-pointer hover:bg-muted/50 transition-colors border-l-2 border-l-transparent hover:border-l-[#6091c3]"
                  key={workshop.id}
                  onClick={() => handleClick(workshop.id)}
                  tabIndex={0}
                >
                  <TableCell className="text-muted-foreground text-sm">
                    {workshop.id}
                  </TableCell>
                  <TableCell className="font-medium">{workshop.name}</TableCell>
                  <TableCell>{workshop.location}</TableCell>
                  <TableCell>{workshop.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No results found</p>
          </div>
        )}
      </div>
    </>
  );
};
