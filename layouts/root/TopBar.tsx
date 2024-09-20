"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import config from "@/config";
import { getTwoWordRepresentation } from "@/helpers";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TopBar(props: { user: User | null }) {
  const { user } = props;
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out!");
    router.push("/");
    router.refresh();
  };
  return (
    <nav className="w-full sticky top-0 left-0 px-6 sm:px-12 md:px-24 bg-white border-b py-4 h-[75px]">
      <div className="flex justify-between w-full items-center h-full">
        <Link href="/">
          <h4 className="text-lg font-semibold tracking-tight">{config.name}</h4>
        </Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user_metadata.picture} />
                <AvatarFallback>
                  {getTwoWordRepresentation(user.user_metadata.full_name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.user_metadata.full_name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-muted-foreground mt-0 pt-0">
                {user.user_metadata.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout from {config.name}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth" className={buttonVariants({})}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
