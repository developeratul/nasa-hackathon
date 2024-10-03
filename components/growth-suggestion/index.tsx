"use client";

import { getGrowthSuggestion } from "@/actions/common.actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateSunlightHours, kelvinToCelsius } from "@/helpers/weather";
import { cn } from "@/lib/utils";
import { fertilizerTypes, soilTypes, waterFrequencies } from "@/types/soil";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { ChartNoAxesColumnIncreasing, Loader2, ShrubIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCurrentWeatherData } from "../dashboard/CurrentWeather";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

export const getGrowthSuggestionSchema = z.object({
  soilType: z.enum(soilTypes),
  waterFrequency: z.enum(waterFrequencies),
  fertilizerType: z.enum(fertilizerTypes),
  // sunLightHours: z.number(),
  // temperature: z.number(),
  // humidity: z.number(),
});

export type GetGrowthSuggestionParams = z.infer<typeof getGrowthSuggestionSchema> & {
  humidity: number;
  sunLightHours: number;
  temperature: number;
};

export default function GrowthSuggestion() {
  const [open, { toggle }] = useDisclosure();
  const form = useForm<z.infer<typeof getGrowthSuggestionSchema>>({
    resolver: zodResolver(getGrowthSuggestionSchema),
    defaultValues: {
      soilType: "Loamy",
      fertilizerType: "Organic",
      waterFrequency: "Daily",
    },
  });
  const { isPending, isError, data, error } = useCurrentWeatherData();
  const { mutateAsync, isPending: isProcessing } = useMutation({
    mutationKey: ["get-growth-suggestion"],
    mutationFn: (data: GetGrowthSuggestionParams) => getGrowthSuggestion(data),
  });
  const [result, setResult] = useState<{ growth_stage: boolean; suggestion: string } | undefined>();

  const canSubmit = !isPending && !isError;

  async function onSubmit(values: z.infer<typeof getGrowthSuggestionSchema>) {
    if (!canSubmit) return;
    setResult(undefined);
    try {
      const result = await mutateAsync({
        ...values,
        humidity: data.humidity,
        temperature: parseInt(kelvinToCelsius(data.temp)),
        sunLightHours: parseInt(calculateSunlightHours(data.sunrise, data.sunset).toFixed(2)),
      });
      setResult({
        growth_stage: result.growth_stage === "Not Reached" ? false : true,
        suggestion: result.suggestion,
      });
      toast.success("Here you go!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
      toast.error("Can't submit the form!");
    }
  }, [isError, error]);

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger asChild onClick={toggle}>
        <Button size="lg" variant="secondary" className="w-full justify-start items-center">
          <ShrubIcon className="w-5 h-5 mr-4" />
          Growth Recommendation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Growth Recommendation</DialogTitle>
          <DialogDescription>
            Get to know if you are on the right track with your crops.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="soilType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soil Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fertilizerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fertilizer Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {fertilizerTypes.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Frequency</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {waterFrequencies.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!canSubmit || isProcessing} type="submit">
              {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin text-inherit" />}
              {isProcessing ? "Processing..." : "Get Suggestion"}
            </Button>
          </form>
          {result && (
            <Alert
              className={cn(result.growth_stage && "text-green-600 border-green-600")}
              variant={result.growth_stage ? "default" : "destructive"}
            >
              <ChartNoAxesColumnIncreasing className="h-4 w-4 text-inherit" />
              <AlertTitle>
                Growth State: <b>{result?.growth_stage ? "Reached" : "Not Reached"}</b>
              </AlertTitle>
              <AlertDescription className="mt-2">{result.suggestion}</AlertDescription>
            </Alert>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
