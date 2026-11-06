import BookingDestinationCard from "@/components/bookmark/BookingDestinationCard";
import { auth } from "@/lib/auth";
import { getTokenServer } from "@/lib/getTokenServer";
import { IBooking } from "@/type/destinationsType";
import { headers } from "next/headers";

const BookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const token = await getTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${user?.email}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const bookings: IBooking[] = await res.json();

  console.log(bookings);
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-semibold sm:text-3xl">My Bookings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <BookingDestinationCard
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          You don&apos;t have any bookings yet.
        </div>
      )}
    </main>
  );
};

export default BookingsPage;

// umorfarukridoy1@gmail.com
