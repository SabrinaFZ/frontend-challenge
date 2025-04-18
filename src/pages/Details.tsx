import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Car } from "@/types/car";
import { formatPrice } from "@/utils/formatPrice";
import axios from "axios";
import { Fuel, Gauge } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

export const Details = () => {
  const [data, setData] = useState<Car | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Car>(`http://localhost:3001/data/${id}`);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-lg">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
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
    </div>
  );
};
