import { SoilType, soilTypes } from "@/types/soil";

export function getRandomSoilType(): SoilType {
  const randomIndex = Math.floor(Math.random() * soilTypes.length);
  return soilTypes[randomIndex];
}
