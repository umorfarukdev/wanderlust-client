import type { Metadata } from "next";
import ProfileView from "@/components/profile/profile-view";
import { auth } from "@/lib/auth";
import { IBooking } from "@/type/destinationsType";
import { getTokenServer } from "@/lib/getTokenServer";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your account settings and travel preferences.",
};

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user;
  const email = user?.email;
  let bookings: IBooking[] = [];
  if (email) {
    try {
      const token = await getTokenServer()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${email}`, {
        headers: {
          authorization: `Bearer ${token}`
        },
        cache: "no-store"
      })
      if (res.ok) {
        const data = await res.json();
        bookings = Array.isArray(data) ? data : [];
      }
    } catch (err) {
      console.error("Error featching bookings", err);
    }
  }
  return <ProfileView bookings={bookings} />;
};

export default ProfilePage;