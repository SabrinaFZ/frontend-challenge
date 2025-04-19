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
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold">
                    {data.model}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {data.year} Model
                  </CardDescription>
                </div>
                <div className="flex items-center justify-center text-2xl font-bold text-primary">
                  {formatPrice(Number(data.price))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="flex gap-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Fuel className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Engine</p>
                      <p className="font-medium">{data.engine}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Gauge className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Transmission
                      </p>
                      <p className="font-medium">{data.transmission}</p>
                    </div>
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
