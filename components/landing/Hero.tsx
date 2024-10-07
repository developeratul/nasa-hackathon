"use client";

import DashboardSrc from "@/assets/dashboard.jpeg";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Spotlight } from "../ui/SpotLight";

export default function Hero() {
  return (
    <header className="py-24 flex justify-center items-center">
      <Spotlight
        className="-top-40 left-0 md:left-[40%] -z-0 md:-top-0"
        fill="hsl(var(--primary))"
      />
      <div className="flex flex-col justify-center gap-y-12 items-center">
        <div className="container max-w-5xl flex flex-col justify-center items-center gap-6 text-center">
          <Badge variant="outline" className="text-base">
            Revolultionailzing Farming
          </Badge>
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-primary">
            Let data do the heavy lifting while you reap the rewards.
          </h1>
          <p className="max-w-5xl text-xl font-medium text-muted-foreground">
            We help farmers thrive with user-friendly tools! Our personalized dashboard offers crop
            suggestions and weather updates, making it easy to make smart decisions. With insights
            and best practices at your fingertips, you'll boost yields and save time. Let's farm
            smarter together!
          </p>
          <Link href="/app">
            <Button
              size="lg"
              className="text-lg h-auto min-h-12 font-bold rounded-full shadow-md shadow-primary neon"
            >
              Get Started <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="max-w-5xl">
          <Image
            src={DashboardSrc}
            alt="Dashboard demo image"
            className="w-full rounded-lg border"
          />
        </div>
      </div>
    </header>
  );
}
