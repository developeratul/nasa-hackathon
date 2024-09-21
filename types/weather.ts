export interface CurrentWeather {
  name: string;
  countryCode: string;
  sunrise: number;
  sunset: number;
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  clouds: number;
  wind: number; // m/s
  pressure: number;
  status: string;
  icon: string;
}
