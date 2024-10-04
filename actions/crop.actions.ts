"use server";

import { delay } from "@/helpers";
import { getRandomSoilType } from "@/helpers/soil";
import { SoilType } from "@/types/soil";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";

interface SoilData {
  soilType: SoilType;
  list: string[];
  suggestion: string;
}

const soilDataWithList: SoilData[] = [
  {
    soilType: 'Aluvial',
    list: ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute', 'Maize'],
    suggestion: 'Aluvial soil is highly fertile and supports a wide range of crops. It is best for growing cereals like rice and wheat, especially in river valleys. Ensure proper irrigation for better yields.'
  },
  {
    soilType: 'Kapur',
    list: ['Olive', 'Grapes', 'Wheat', 'Barley', 'Almonds', 'Fig'],
    suggestion: 'Kapur (calcareous or limestone) soil is ideal for crops like grapes and olives that thrive in well-drained, alkaline soils. Regular soil testing is advised to monitor pH levels and nutrient balance.'
  },
  {
    soilType: 'Andosol',
    list: ['Tea', 'Coffee', 'Potatoes', 'Maize', 'Barley'],
    suggestion: 'Andosols are volcanic soils rich in organic material, retaining water well. They are ideal for crops like tea and coffee, but require regular fertilization due to rapid nutrient depletion.'
  },
  {
    soilType: 'Entisol',
    list: ['Rice', 'Wheat', 'Millet', 'Sugarcane', 'Maize'],
    suggestion: 'Entisols are young soils with little profile development, often found in river deltas. They can support a wide range of crops with adequate water and fertilization to compensate for their low natural fertility.'
  },
  {
    soilType: 'Laterit',
    list: ['Rubber', 'Tea', 'Coconut', 'Coffee', 'Cashew', 'Pineapple'],
    suggestion: 'Laterite soil is rich in iron and aluminum, suitable for crops like tea and rubber. Ensure good drainage and apply organic matter to improve fertility, as these soils can be nutrient-poor.'
  },
  {
    soilType: 'Pasir',
    list: ['Cactus', 'Date Palm', 'Agave', 'Millet', 'Aloe Vera'],
    suggestion: 'Pasir (sandy) soil has low water retention and is best suited for drought-tolerant plants like cacti and date palms. Add organic material or mulch to retain moisture and nutrients.'
  },
  {
    soilType: 'Humus',
    list: ['Vegetables', 'Fruits', 'Flowers', 'Cereals', 'Legumes'],
    suggestion: 'Humus-rich soil is highly fertile, ideal for growing vegetables, fruits, and flowers. It retains moisture well and enhances root growth, but be sure to maintain its nutrient levels with compost or organic fertilizers.'
  },
  {
    soilType: 'Inceptisol',
    list: ['Rice', 'Tea', 'Sugarcane', 'Corn', 'Soybean'],
    suggestion: 'Inceptisols are young, moderately developed soils found in a wide range of environments. They can support a variety of crops but require careful nutrient management and regular fertilization for high yields.'
  }
];

export async function generateCropRecommendation(formData: FormData) {
try {
  const { data } = await axios.post("http://127.0.0.1:8000/predict-soil-type", formData);
  const soilData =soilDataWithList.find((item) => item.soilType === data.soil_type);

  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You are not authorized");

  const query = await supabase
    .from("crop-suggestion")
    .insert({ ...soilData, user_id: user.id })
    .select("*")
    .single();

  if (query.error) {
    throw new Error(query.error.message);
  }

  return { data: query.data, message: "Crop recommendation generated successfully" };
} catch(err) {
  console.log(err)
  throw new Error((err as Error)?.message || "Unknown Error Occurred");

}
}

export async function getCropRecommendations() {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You are not authorized");

  const query = await supabase.from("crop-suggestion").select("*").eq("user_id", user.id).order("created_at", {
    ascending: false
  });

  if (query.error) {
    throw new Error(query.error.message);
  }

  return query.data;
}
