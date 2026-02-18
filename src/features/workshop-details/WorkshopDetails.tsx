import { Error } from "@/components/common/Error";
import { Loading } from "@/components/common/Loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useWorkshopDetails } from "./useWorkshopDetails";

export const WorkshopDetails = ({ id }: { id: string }) => {
  const { data, loading, error } = useWorkshopDetails(id);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      {data ? (
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{data.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{data.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{data.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-lg">No details</p>
      )}
    </>
  );
};
