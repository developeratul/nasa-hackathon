import { WeatherForecast } from "@/types/weather";

export function getWeatherStatusIconUrl(name: string) {
  return `http://openweathermap.org/img/w/${name}.png`;
}

export function getFlagUrl(countryCode: string) {
  return `https://openweathermap.org/images/flags/${countryCode}.png`;
}

export function kelvinToCelsius(kelvin: number) {
  return (kelvin - 273.15).toFixed(0);
}

export function mph_to_kmh(milesPerSecond: number): string {
  const kilometersPerMile = 1.60934; // Conversion factor
  return (milesPerSecond * kilometersPerMile).toFixed(2);
}

export function removeDuplicateDates(arr: WeatherForecast[]): WeatherForecast[] {
  const uniqueDates = new Map<string, WeatherForecast>();

  // Iterate through the array and store the last occurrence of each date
  arr.forEach((item) => {
    uniqueDates.set(new Date(item.date * 1000).toLocaleDateString(), item); // This will overwrite any previous entries
  });

  // Convert the map values back into an array
  return Array.from(uniqueDates.values());
}

export function getAitQualityLabel(index: number) {
  const indexes: Record<number, string> = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };
  return indexes[index];
}

export function getAirQualityBadgeClassName(index: number) {
  const classNames: Record<number, string> = {
    1: "border-green-500 text-green-500",
    2: "border-green-500 text-green-500",
    3: "border-orange-500 text-orange-500",
    4: "border-red-500 text-red-500",
    5: "border-red-500 text-red-500",
  };
  return classNames[index];
}
