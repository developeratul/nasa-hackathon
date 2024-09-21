"use client";

import { getCurrentWeather } from "@/actions/weather.actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFlagUrl, getWeatherStatusIconUrl, kelvinToCelsius } from "@/helpers/weather";
import { useLocation } from "@/providers/location";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../common/Loader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function CurrentWeather() {
  const { coordinates } = useLocation();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["get-current-weather"],
    queryFn: () => getCurrentWeather({ lat: coordinates.lat, lon: coordinates.lon }),
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
        <div className="flex justify-between items-start gap-6">
          <div className="flex items-center gap-3">
            <div>
              <Image
                src={getWeatherStatusIconUrl(data.icon)}
                alt="Weather Status Icon"
                width={50}
                height={50}
              />
            </div>
            <div>
              <CardTitle>{data.name}</CardTitle>
              <CardDescription>{data.status}</CardDescription>
            </div>
          </div>
          <div>
            <Image
              src={getFlagUrl(data.countryCode.toLowerCase())}
              alt={data.countryCode}
              width={25}
              height={25}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-6">
            <h3 className="text-4xl font-semibold leading-relaxed">
              {kelvinToCelsius(data.temp)}
              <sup>&deg;</sup>C
            </h3>
            <div>
              <h4 className="text-base font-medium">{data.status}</h4>
              <p className="text-sm text-muted-foreground">
                Feels like {kelvinToCelsius(data.feels_like)}
                <sup>&deg;</sup>C
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <ArrowUpIcon className="w-4 h-4 mr-2 text-red-500" />
              <span className="text-sm">Max: {kelvinToCelsius(data.temp_max)}&deg;C</span>
            </Badge>
            <Badge variant="outline">
              <ArrowDownIcon className="w-4 h-4 mr-2 text-cyan-500" />
              <span className="text-sm">Min: {kelvinToCelsius(data.temp_min)}&deg;C</span>
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 divide-x">
          <div className="space-y-0 flex flex-col justify-center items-center">
            <h4 className="text-xs font-medium text-muted-foreground">Wind</h4>
            <p className="text-base font-medium">{data.wind} km/h</p>
          </div>
          <div className="space-y-0 flex flex-col justify-center items-center">
            <h4 className="text-xs font-medium text-muted-foreground">Clouds</h4>
            <p className="text-base font-medium">{data.clouds}%</p>
          </div>
          <div className="space-y-0 flex flex-col justify-center items-center">
            <h4 className="text-xs font-medium text-muted-foreground">Pressure</h4>
            <p className="text-base font-medium">{data.pressure} mb</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/app/weather" className="block min-w-full">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
