"use client";
import { Button } from "@/components/ui/button";
import { LocationProvider } from "@/providers/location";
import { AppProps } from "@/types";
import { CloudSunIcon, LayoutDashboardIcon, PickaxeIcon, VeganIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboardIcon },
  { label: "Weather", href: "/app/weather", icon: CloudSunIcon },
  { label: "Crop Recommendation", href: "/app/crop-recommendation", icon: VeganIcon },
  { label: "Soil Condition", href: "/app/soil-condition", icon: PickaxeIcon },
];

export default function AppLayout(props: AppProps) {
  const { children } = props;
  const pathname = usePathname();
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex gap-0 h-full justify-between">
        <aside className="w-full overflow-x-hidden space-y-3 max-w-xs border-r h-full p-4">
          <h2 className="text-sm font-medium text-muted-foreground">Tools</h2>
          <div className="space-y-3">
            {links.map((link) => (
              <Link key={link.href} className="block" href={link.href}>
                <Button
                  variant={pathname === link.href ? "default" : "secondary"}
                  size="lg"
                  className="w-full justify-start items-center"
                >
                  <link.icon className="w-5 h-5 mr-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </aside>
        <div className="w-full flex-1 p-6 overflow-x-hidden">
          <LocationProvider>{children}</LocationProvider>
        </div>
      </div>
    </div>
  );
}
