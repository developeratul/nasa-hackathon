"use client";
import { getWeatherForecast } from "@/actions/weather.actions";
import { getWeatherStatusIconUrl, kelvinToCelsius, removeDuplicateDates } from "@/helpers/weather";
import { useLocation } from "@/providers/location";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Loader from "../common/Loader";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function WeatherForeCast() {
  const { coordinates } = useLocation();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["get-weather-forecast"],
    queryFn: () => getWeatherForecast({ lat: coordinates.lat, lon: coordinates.lon }),
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
        <CardTitle>5 Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {removeDuplicateDates(data).map((forecast, index) => (
            <ul
              className="grid py-2 first:pt-0 last:pb-0 items-center grid-cols-3 gap-3"
              key={index}
            >
              <li className="flex items-center gap-2">
                <div>
                  <Image
                    src={getWeatherStatusIconUrl(forecast.icon)}
                    alt="Weather Status Icon"
                    width={50}
                    height={50}
                  />
                </div>
                <span className="text-base text-primary font-medium">
                  {kelvinToCelsius(forecast.temp)}
                  <sup>&deg;</sup>
                </span>
              </li>
              <li className="text-center">
                <span className="text-muted-foreground text-sm">
                  {dayjs(new Date(forecast.date * 1000)).format("DD MMM")}
                </span>
              </li>
              <li className="text-right">
                <span className="text-muted-foreground text-sm">
                  {dayjs(new Date(forecast.date * 1000)).format("dddd")}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
