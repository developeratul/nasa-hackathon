"use client";

import DashboardSrc from "@/assets/dashboard.jpeg";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <header className="py-24 flex justify-center items-center">
      <div className="flex flex-col justify-center gap-y-12 items-center">
        <div className="container max-w-4xl flex flex-col justify-center items-center gap-6 text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-primary">
            Let data do the heavy lifting while you reap the rewards.
          </h1>
          <p className="max-w-3xl text-base font-medium text-muted-foreground">
            We help farmers thrive with user-friendly tools! Our personalized dashboard offers crop
            suggestions and weather updates, making it easy to make smart decisions. With insights
            and best practices at your fingertips, you'll boost yields and save time. Let's farm
            smarter together!
          </p>
          <Button size="lg">
            Get Started <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="max-w-4xl">
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
