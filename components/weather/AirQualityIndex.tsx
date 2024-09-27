"use client";
import { getAirQualityIndex } from "@/actions/weather.actions";
import { getAirQualityBadgeClassName, getAitQualityLabel } from "@/helpers/weather";
import { cn } from "@/lib/utils";
import { useLocation } from "@/providers/location";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function AirQualityIndex() {
  const { coordinates } = useLocation();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["get-air-quality-index"],
    queryFn: () => getAirQualityIndex({ lat: coordinates.lat, lon: coordinates.lon }),
  });

  if (isPending) {
    return (
      <Card className="p-4">
        <Loader />
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <AlertTitle>Data fetching Error!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <CardTitle>Air Quality Index</CardTitle>
          <Badge variant="outline" className={cn(getAirQualityBadgeClassName(data.index))}>
            {getAitQualityLabel(data.index)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid divide-x grid-cols-4">
          <div className="flex gap-y-1 flex-col text-center items-center justify-center">
            <p className="text-sm text-muted-foreground">PM2.5</p>
            <span className="font-semibold text-lg text-primary">{data.pm2_5}</span>
          </div>
          <div className="flex gap-y-1 flex-col text-center items-center justify-center">
            <p className="text-sm text-muted-foreground">
              SO<sub>2</sub>
            </p>
            <span className="font-semibold text-lg text-primary">{data.so2}</span>
          </div>
          <div className="flex gap-y-1 flex-col text-center items-center justify-center">
            <p className="text-sm text-muted-foreground">
              NO<sub>2</sub>
            </p>
            <span className="font-semibold text-lg text-primary">{data.no2}</span>
          </div>
          <div className="flex gap-y-1 flex-col text-center items-center justify-center">
            <p className="text-sm text-muted-foreground">
              O<sub>3</sub>
            </p>
            <span className="font-semibold text-lg text-primary">{data.o3}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
