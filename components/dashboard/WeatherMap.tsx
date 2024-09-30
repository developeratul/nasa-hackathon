"use client";
import Src from "@/assets/map.png";
import Image from "next/image";

export default function WeatherMap() {
  return (
    <div className="w-full h-full bg-red-500 rounded-md overflow-hidden border shadow-sm">
      <Image src={Src} alt="map" className="w-full object-cover h-full" />
    </div>
  );
}
