"use server";

import { env } from "@/env.mjs";
import { CurrentLocation } from "@/types";
import { AirQualityIndex, CurrentWeather, WeatherForecast } from "@/types/weather";
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
      humidity: data.main.humidity,
      visibility: data.visibility,
    } as CurrentWeather;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || err.message);
    }
    throw new Error((err as Error)?.message || "Unknown Error Occurred");
  }
}

export async function getWeatherForecast(location: CurrentLocation) {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${env.WEATHER_API_KEY}`
    );
    const forecastData = data.list.map((item: (typeof data.list)[number]) => {
      return {
        name: data.city.name,
        status: item.weather[0].main,
        icon: item.weather[0].icon,
        temp: item.main.temp,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        clouds: item.clouds.all,
        countryCode: data.city.country,
        feels_like: item.main.feels_like,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
        wind: item.wind.speed,
        windDirection: item.wind.deg,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        date: item.dt,
      };
    }) as WeatherForecast[];
    return forecastData;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || err.message);
    }
    throw new Error((err as Error)?.message || "Unknown Error Occurred");
  }
}

export async function getAirQualityIndex(location: CurrentLocation) {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${env.WEATHER_API_KEY}`
    );
    return {
      no2: data.list[0].components.no2,
      o3: data.list[0].components.o3,
      pm2_5: data.list[0].components.pm2_5,
      so2: data.list[0].components.so2,
      index: data.list[0].main.aqi,
    } as AirQualityIndex;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message || err.message);
    }
    throw new Error((err as Error)?.message || "Unknown Error Occurred");
  }
}

export async function getWeatherSummary(params: {
  temperature: number;
  humidity: number;
  air_condition_index: [number, number, number, number];
  wind_speed: number;
  air_pressure: number;
}) {
  try {
    const { data } = await axios.post("http://127.0.0.1:8000/weather-suggestion", params);
    return data;
  } catch (err) {
    throw new Error((err as Error)?.message || "Unknown Error Occurred");
  }
}
