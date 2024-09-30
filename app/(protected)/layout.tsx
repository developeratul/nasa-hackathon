import { AppProps } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout(props: AppProps) {
  const { children } = props;
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/auth");
  }

  return children;
}

export const dynamic = "force-dynamic";
