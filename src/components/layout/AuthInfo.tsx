"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const userLinks = [
  { label: "Login", href: "/sign-in", icon: false },
  { label: "Sign Up", href: "/sign-up", icon: false },
];

const AuthInfo = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <span className="text-sm text-muted-foreground">Loading...</span>;
  }
  const hamdleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    redirect("/sign-in");
  };
  return (
    <>
      {session?.user ? (
        <>
          <Link href={"/profile"} className="flex items-center gap-1">
            {" "}
            <UserIcon></UserIcon> Profile
          </Link>
          <Popover>
            <PopoverTrigger
              render={
                <button>
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image as string}
                      alt={session?.user?.name}
                      className="grayscale"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
              }
            />
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>{session?.user?.name}</PopoverTitle>
                <PopoverDescription>{session?.user?.email}</PopoverDescription>
                <Button
                  variant={"destructive"}
                  onClick={hamdleSignOut}
                  className="flex items-center gap-1.5 text-foreground/90 transition-colors hover:text-[#0f9b96]"
                >
                  Sign Out
                </Button>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <>
          {userLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 text-foreground/90 transition-colors hover:text-[#0f9b96]"
            >
              {link.label}
            </Link>
          ))}
        </>
      )}
    </>
  );
};

export default AuthInfo;
