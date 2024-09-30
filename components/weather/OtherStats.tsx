"use client";
import { kelvinToCelsius } from "@/helpers/weather";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { EyeIcon, FlameIcon, ThermometerIcon, WindIcon } from "lucide-react";
import Loader from "../common/Loader";
import { useCurrentWeatherData } from "../dashboard/CurrentWeather";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card } from "../ui/card";

export default function OtherStats() {
  const { isPending, isError, data, error } = useCurrentWeatherData();

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
    <Card className="p-4">
      <div className="grid divide-x grid-cols-4">
        <div className="flex items-center justify-center py-6 gap-3">
          <FlameIcon className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <span className="font-semibold text-lg text-primary">
              {data.humidity}
              <span className="text-xs text-muted-foreground">%</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 py-6">
          <WindIcon className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Pressure</p>
            <span className="font-semibold text-lg text-primary">
              {data.pressure} <span className="text-xs text-muted-foreground">hPa</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 py-6">
          <EyeIcon className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Visibility</p>
            <span className="font-semibold text-lg text-primary">
              {(data.visibility / 1000).toFixed(2)}{" "}
              <span className="text-xs text-muted-foreground">km</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 py-6">
          <ThermometerIcon className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Feels Like</p>
            <span className="font-semibold text-lg text-primary">
              {kelvinToCelsius(data.feels_like)}&deg;
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
