import { Error } from "@/components/common/Error";
import { Loading } from "@/components/common/Loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useWorkshopDetails } from "./useWorkshopDetails";
import { MapPin, Phone } from "lucide-react";

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
        <div className="container mx-auto py-8 max-w-2xl">
          <Card className="border-l-4 border-l-[#001e50] shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-[#001e50]">
                {data.name}
              </CardTitle>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mt-3">
                Contact Information
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001e50]/8 shrink-0">
                  <MapPin className="h-4 w-4 text-[#001e50]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium text-sm">{data.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001e50]/8 shrink-0">
                  <Phone className="h-4 w-4 text-[#001e50]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm">{data.phone}</p>
                </div>
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
