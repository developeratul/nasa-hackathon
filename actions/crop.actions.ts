"use server";

import { delay } from "@/helpers";
import { getRandomSoilType } from "@/helpers/soil";
import { SoilType } from "@/types/soil";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface SoilData {
  soilType: SoilType;
  list: string[];
  suggestion: string;
}

const soilData: SoilData[] = [
  {
    soilType: "Loamy",
    list: ["Tomatoes", "Carrots", "Wheat", "Sugarcane"],
    suggestion:
      "Loamy soil is rich in nutrients, well-draining, and holds moisture effectively, making it ideal for a wide range of crops.",
  },
  {
    soilType: "Sandy",
    list: ["Potatoes", "Peanuts", "Watermelons", "Carrots"],
    suggestion:
      "Sandy soil has excellent drainage but doesn't hold nutrients as well, so crops that don't require a lot of moisture thrive here.",
  },
  {
    soilType: "Clay",
    list: ["Rice", "Lettuce", "Broccoli", "Kale"],
    suggestion:
      "Clay soil retains water well and is nutrient-rich, making it ideal for water-tolerant crops, but requires proper drainage management.",
  },
  {
    soilType: "Silty",
    list: ["Corn", "Beans", "Cucumbers", "Spinach"],
    suggestion:
      "Silty soil is smooth and retains moisture, which helps support fast-growing crops that need plenty of water.",
  },
  {
    soilType: "Peaty",
    list: ["Potatoes", "Onions", "Cabbage", "Carrots"],
    suggestion:
      "Peaty soil is rich in organic matter and retains moisture well, but it can be acidic, so lime is often added to balance pH for vegetable crops.",
  },
];

export async function generateCropRecommendation() {
  const soilType = getRandomSoilType();
  const data = soilData.find((item) => item.soilType === soilType);

  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You are not authorized");

  const query = await supabase
    .from("crop-suggestion")
    .insert({ ...data, user_id: user.id })
    .select("*")
    .single();

  if (query.error) {
    throw new Error(query.error.message);
  }

  await delay(5000);

  return { data: query.data, message: "Crop recommendation generated successfully" };
}

export async function getCropRecommendations() {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You are not authorized");

  const query = await supabase.from("crop-suggestion").select("*").eq("user_id", user.id);

  if (query.error) {
    throw new Error(query.error.message);
  }

  return query.data;
}
