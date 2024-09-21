import CurrentWeather from "@/components/dashboard/CurrentWeather";

export default async function DashboardPage() {
  return (
    <main>
      <div className="grid grid-cols-3 gap-6">
        <CurrentWeather />
        <CurrentWeather />
        <CurrentWeather />
      </div>
    </main>
  );
}
