import config from "@/config";
import TopBar from "@/layouts/root/TopBar";
import { cn } from "@/lib/utils";
import AppProvider from "@/providers/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: config.name,
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased w-full h-screen overflow-hidden flex flex-col gap-0",
          GeistSans.className
        )}
      >
        <AppProvider>
          <TopBar user={user.data.user ?? null} />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
