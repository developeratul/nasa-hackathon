"use server";

import { env } from "@/env.mjs";
import { CurrentLocation } from "@/types";
import { CurrentWeather } from "@/types/weather";
import axios, { AxiosError } from "axios";

export async function getCurrentWeather(location: CurrentLocation) {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${env.WEATHER_API_KEY}`
    );
    return {
      name: data.name,
      status: data.weather[0].main,
      icon: data.weather[0].icon,
      temp: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      clouds: data.clouds.all,
      countryCode: data.sys.country,
      feels_like: data.main.feels_like,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      wind: data.wind.speed,
      pressure: data.main.pressure,
    } as CurrentWeather;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || err.message);
    }
    throw new Error((err as Error)?.message || "Unknown Error Occurred");
  }
}
