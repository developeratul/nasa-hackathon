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
  windDirection: number;
  pressure: number;
  status: string;
  icon: string;
  humidity: number;
  visibility: number;
}

export interface WeatherForecast extends CurrentWeather {
  date: number;
}

export interface AirQualityIndex {
  pm2_5: number;
  so2: number;
  no2: number;
  o3: number;
  index: number;
}
