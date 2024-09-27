"use client";
import { getWeatherForecast } from "@/actions/weather.actions";
import DirectionSrc from "@/assets/direction.png";
import { getWeatherStatusIconUrl, kelvinToCelsius, mph_to_kmh } from "@/helpers/weather";
import { useLocation } from "@/providers/location";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Loader from "../common/Loader";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function HourlyForeCast() {
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
        <CardTitle>Today At</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap max-w-full pb-4">
          <div className="grid grid-cols-7 gap-3 min-w-max">
            {data.slice(0, 7).map((forecast, index) => (
              <div className="space-y-3" key={index}>
                <div className="border rounded-xl p-4 flex justify-center items-center text-center gap-y-3 flex-col">
                  <p className="text-sm font-medium text-muted-foreground">
                    {dayjs(new Date(forecast.date * 1000)).format("h A")}
                  </p>
                  <div>
                    <Image
                      src={getWeatherStatusIconUrl(forecast.icon)}
                      alt="Weather Status Icon"
                      width={50}
                      height={50}
                    />
                  </div>
                  <p className="text-base font-semibold text-primary">
                    {kelvinToCelsius(forecast.temp)}&deg;
                  </p>
                </div>
                <div className="border rounded-xl p-4 flex justify-center items-center text-center gap-y-3 flex-col">
                  <div
                    className="transform"
                    style={{ rotate: `${forecast.windDirection - 180}deg` }}
                  >
                    <Image src={DirectionSrc} alt="Wind Direction Icon" width={35} height={35} />
                  </div>
                  <p className="text-sm font-medium text-primary">
                    {mph_to_kmh(forecast.wind)}{" "}
                    <span className="text-xs text-muted-foreground">km/h</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
