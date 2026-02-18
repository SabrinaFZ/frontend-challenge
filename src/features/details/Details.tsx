import { Error } from "@/components/common/Error";
import { Loading } from "@/components/common/Loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDetails } from "@/features/details/useDetails";
import { formatPrice } from "@/utils/formatPrice";
import { Fuel, Gauge } from "lucide-react";

export const Details = ({ id }: { id: string }) => {
  const { data, loading, error } = useDetails(id);

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
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold text-[#001e50]">
                    {data.model}
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    {data.year} Model
                  </CardDescription>
                </div>
                <div className="text-2xl font-bold text-primary tabular-nums">
                  {formatPrice(Number(data.price))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                Specifications
              </p>
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001e50]/8">
                    <Fuel className="h-4 w-4 text-[#001e50]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Engine</p>
                    <p className="font-medium text-sm">{data.engine}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001e50]/8">
                    <Gauge className="h-4 w-4 text-[#001e50]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Transmission</p>
                    <p className="font-medium text-sm">{data.transmission}</p>
                  </div>
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
