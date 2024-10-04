import CurrentWeather from "@/components/dashboard/CurrentWeather";
import AirQualityIndex from "@/components/weather/AirQualityIndex";
import HourlyForeCast from "@/components/weather/HourlyForeCast";
import OtherStats from "@/components/weather/OtherStats";
import SunriseSunset from "@/components/weather/SunriseSunset";
import WeatherForeCast from "@/components/weather/WeatherForeCast";
import WeatherSummary from "@/components/weather/WeatherSummary";

export default async function WeatherPage() {
  return (
    <main>
      <div className="grid grid-cols-3 items-start gap-6">
        <div className="grid grid-cols-1 gap-6 sticky top-0 left-0">
          <CurrentWeather isSummarized />
          <WeatherForeCast />
        </div>
        <div className="col-span-2">
          <h2 className="text-lg font-semibold tracking-tight leading-none mb-6">
            Today&apos;s Highlights
          </h2>
          <div className="mb-6">
            <WeatherSummary />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <AirQualityIndex />
            <SunriseSunset />
            <div className="col-span-2 space-y-6">
              <OtherStats />
              <HourlyForeCast />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
