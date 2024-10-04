"use client";
import { getWeatherSummary } from "@/actions/weather.actions";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { useCurrentWeatherData } from "../dashboard/CurrentWeather";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAirQualityIndexQuery } from "./AirQualityIndex";

export default function WeatherSummary() {
  const weatherDataQuery = useCurrentWeatherData();
  const airQualityIndexQuery = useAirQualityIndexQuery();
  const isDataPending = weatherDataQuery.isPending || airQualityIndexQuery.isPending;
  const isDataError = weatherDataQuery.isError || airQualityIndexQuery.isPending;
  const dataError = weatherDataQuery.error || airQualityIndexQuery.error;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["get-weather-summary"],
    queryFn: () =>
      getWeatherSummary({
        air_condition_index: [
          airQualityIndexQuery.data?.pm2_5 as number,
          airQualityIndexQuery.data?.so2 as number,
          airQualityIndexQuery.data?.no2 as number,
          airQualityIndexQuery.data?.o3 as number,
        ],
        air_pressure: weatherDataQuery.data?.pressure as number,
        humidity: weatherDataQuery.data?.humidity as number,
        temperature: weatherDataQuery.data?.temp as number,
        wind_speed: weatherDataQuery.data?.wind as number,
      }),
    disabled: !!(isDataPending || isDataError),
  });

  console.log({ data, isPending, isError, error });

  if (isPending) {
    return (
      <Card className="p-4">
        <Loader />
      </Card>
    );
  }

  if (isDataError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <AlertTitle>Data fetching Error!</AlertTitle>
        <AlertDescription>{dataError.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Summary 🌄</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base font-medium text-muted-foreground">
          Today&apos;s weather? Think of it like nature's version of "sweater weather denial." It's
          sunny and hot, with temperatures reaching around 94°F (34°C), making it feel like summer
          is clinging on for dear life. Expect clear skies, light breezes, and no chance of rain—so
          leave your umbrella at home, but maybe grab a hat! It&apos;s basically perfect for those
          who love to fry eggs on sidewalks, but if you&apos;re more of a sweater person, well, hang
          in there—cooler days are on the horizon
        </p>
      </CardContent>
    </Card>
  );
}
