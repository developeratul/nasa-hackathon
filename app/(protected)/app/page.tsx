import CropSuggestions from "@/components/dashboard/CropSuggestions";
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import LastSoilConditionReport from "@/components/dashboard/LastSoilConditionReport";
import WeatherMap from "@/components/dashboard/WeatherMap";
import { Badge } from "@/components/ui/badge";
import { getTimeBasedGreeting } from "@/helpers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  return (
    <main>
      <div className="mb-4 flex items-center justify-between gap-12">
        <h2 className="text-xl tracking-tight font-medium text-muted-foreground">
          {getTimeBasedGreeting()},{" "}
          <span className="font-semibold text-primary">{data.user?.user_metadata.full_name}</span>
        </h2>
        <Badge variant="outline" className="py-2 text-sm text-muted-foreground">
          <CalendarIcon className="w-4 h-4 mr-3 text-primary" />
          {dayjs(new Date()).format("DD MMM, YYYY")}
        </Badge>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <CurrentWeather />
          <WeatherMap />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CropSuggestions />
          <LastSoilConditionReport />
        </div>
      </div>
    </main>
  );
}
