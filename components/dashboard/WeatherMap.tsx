"use client";
import Src from "@/assets/map.png";
import Image from "next/image";

export default function WeatherMap() {
  return (
    <div className="w-full rounded-md max-h-[350px] col-span-2 overflow-hidden border shadow-sm">
      <Image src={Src} alt="map" className="w-full object-cover" />
    </div>
  );
}
