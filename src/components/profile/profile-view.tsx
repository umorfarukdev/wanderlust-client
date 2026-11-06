"use client";

import { useSession } from "@/lib/auth-client";
import { IBooking } from "@/type/destinationsType";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  DollarSign,
  Globe,
  Mail,
  Pencil,
  Plane,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import TravelStatistics from "./Travelstatistics";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80";

interface ProfileViewProps {
  bookings?: IBooking[];
}

const ProfileView = ({ bookings = [] }: ProfileViewProps) => {
  const { data: session } = useSession();
  // const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  const name = session?.user?.name || "Sarah Mitchell";
  const email = session?.user?.email;
  const avatar = session?.user?.image?.trim() || DEFAULT_AVATAR;


  // --- 2. Dynamic Member Since ---
  const memberSince = session?.user?.createdAt
    ? new Date(session.user.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
    : "Recently";
  const accountDetails = [
    { label: "Member since", value: memberSince },
    { label: "Nationality", value: "United States" },
  ];



  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account settings and travel preferences
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Profile card */}
          <section className="h-fit rounded-lg border border-border bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.12)]">
            <div className="relative mx-auto w-fit">
              <Image
                src={avatar as string}
                alt={name}
                width={128}
                height={128}
                unoptimized
                className="size-32 rounded-full object-cover"
              />
              <label className="absolute right-0 bottom-2 flex size-8 translate-x-1/3 cursor-pointer items-center justify-center rounded-full bg-[#0f9b96] text-white ring-4 ring-white transition-colors hover:bg-[#14b8b0]">
                <Camera className="size-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                // onChange={handleAvatarChange}
                />
              </label>
            </div>

            <h2 className="mt-4 text-center text-xl font-semibold">{name}</h2>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Mail className="size-4" />
              {email}
            </p>

            <div className="mt-5 space-y-3 border-t border-border pt-4">
              {accountDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{detail.label}</span>
                  <span className="font-semibold">{detail.value}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0f9b96] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#14b8b0]"
            >
              <Pencil className="size-4" />
              Edit Profile
            </button>
          </section>

          {/* Travel statistics */}
          <TravelStatistics bookings={bookings}></TravelStatistics>
        </div>
      </div>
    </main>
  );
};

export default ProfileView;
