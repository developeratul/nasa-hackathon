"use client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { SunriseIcon, SunsetIcon } from "lucide-react";
import Loader from "../common/Loader";
import { useCurrentWeatherData } from "../dashboard/CurrentWeather";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function SunriseSunset() {
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
    <Card>
      <CardHeader>
        <CardTitle>Sunrise & Sunset</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 divide-x">
          <div className="flex items-center text-center flex-col gap-y-3">
            <SunriseIcon className="w-8 h-8 text-orange-500" />
            <span className="text-base font-medium text-muted-foreground">
              {dayjs(new Date(data.sunrise * 1000)).format("h:mm A")}
            </span>
          </div>
          <div className="flex items-center text-center flex-col gap-y-3">
            <SunsetIcon className="w-8 h-8 text-gray-500" />
            <span className="text-base font-medium text-muted-foreground">
              {dayjs(new Date(data.sunset * 1000)).format("h:mm A")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
