"use server";

import { GetGrowthSuggestionParams } from "@/components/growth-suggestion";
import axios from "axios";

export async function getGrowthSuggestion(params: GetGrowthSuggestionParams) {
  try {
    const { data } = await axios.post("https://web-production-d12f.up.railway.app/predict", {
      soil_type: params.soilType,
      water_frequency: params.waterFrequency,
      fertilizer_type: params.fertilizerType,
      sunlight_hours: params.sunLightHours,
      temperature: params.temperature,
      humidity: params.humidity,
    });
    const { growth_stage, suggestion } = data;
    return {
      growth_stage,
      suggestion,
    };
  } catch (err) {
    throw new Error((err as Error)?.message || "Unknown Error Occurred");
  }
}
