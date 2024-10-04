"use client";
import { getCropWeatherSuggestion, getWeatherSummary } from "@/actions/weather.actions";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { useCurrentWeatherData } from "../dashboard/CurrentWeather";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useAirQualityIndexQuery } from "./AirQualityIndex";
import { kelvinToCelsius } from "@/helpers/weather";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { CheckIcon, Crop, Loader2 } from "lucide-react";

export default function WeatherSummary() {
  const weatherDataQuery = useCurrentWeatherData();
  const airQualityIndexQuery = useAirQualityIndexQuery();
  const isPending = weatherDataQuery.isPending || airQualityIndexQuery.isPending;
  const isDataError = weatherDataQuery.isError || airQualityIndexQuery.isError;
  const dataError = weatherDataQuery.error ?? airQualityIndexQuery.error;

  

  if (isPending) {
    return (
      <Card className="p-4">
        <Loader />
      </Card>
    );
  }

  if (isDataError) {
    return ( <Alert variant="destructive">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <AlertTitle>Data fetching Error!</AlertTitle>
        <AlertDescription>{dataError?.message}</AlertDescription>
      </Alert>
     
    );
  }

  return (
    <ActualSumary temperature={parseInt(kelvinToCelsius(weatherDataQuery.data.temp))} humidity={weatherDataQuery.data.humidity} air_condition_index={[airQualityIndexQuery.data.pm2_5, airQualityIndexQuery.data.so2, airQualityIndexQuery.data.no2, airQualityIndexQuery.data.o3]} wind_speed={weatherDataQuery.data.wind} air_pressure={weatherDataQuery.data.pressure} />
  );
}

export interface GetWeatherSummaryParams {
  temperature: number;
  humidity: number;
  air_condition_index: [number, number, number, number];
  wind_speed: number;
  air_pressure: number;
}

function ActualSumary(params: GetWeatherSummaryParams) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["get-weather-summary"],
    queryFn: () => getWeatherSummary(params),
  });
  const { isPending: isProcessing, mutateAsync, reset } = useMutation({
    mutationKey: ['get-crop-weather-suggestion'],
    mutationFn: (params2: GetWeatherSummaryParams & { crop: string}) => getCropWeatherSuggestion(params2)
  })
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[] | undefined>()

  if (isPending) return (
    <Card className="p-4">
    <Loader />
  </Card>
  )
  if (isError) return (
    <Alert variant="destructive">
    <ExclamationTriangleIcon className="w-4 h-4" />
    <AlertTitle>Data fetching Error!</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
  )


  const handleGetCropWeatherSuggestion = async () => {
    setSuggestions(undefined)
    reset()
    try {
      const  suggestions= await mutateAsync({ ...params, crop: input })
      setSuggestions(suggestions)
      setInput("")
      toast.success("Here you go!")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Summary 🌄</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base font-medium text-muted-foreground">
         {data?.suggestion}
        </p>
      </CardContent>
        <CardFooter className="space-y-6">
        <div className="space-y-2 w-full">
          <Label htmlFor="cropNameInput">Which crop are you growing?</Label>
<div className="flex items-center gap-2 w-full">
<Input id="cropNameInput" value={input} onChange={e => setInput(e.target.value)} placeholder="Crop name e.g. Corn" />
<Button disabled={!input.trim() || isProcessing} size="sm" onClick={handleGetCropWeatherSuggestion}

>
{isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin text-inherit" />}
{isProcessing ? "Processing..." : "Get Crop Weather Suggestion"}
</Button>
</div>
{suggestions && (
  <Alert>
  <AlertTitle className="text-base text-green-300
  ">Actions You Should Take</AlertTitle>
  <AlertDescription>
<div className="space-y-3 pt-3">
{suggestions.map((suggestion, index) => (
  <div key={index} className="text-base flex items-start font-medium">
      <CheckIcon className="w-4 h-4 mr-2 text-green-300 shrink-0" />
      {suggestion}
  </div>
))}
</div>
  </AlertDescription>
</Alert>

)}
        </div>
      </CardFooter>
    </Card>
  )
}