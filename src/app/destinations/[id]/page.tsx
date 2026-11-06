import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, Star } from "lucide-react";
import EditDestinationModal from "@/components/destinations/EditDestinationModal";
import IDestination, { IBooking } from "@/type/destinationsType";
import DeleteDestinationModal from "@/components/destinations/DeleteDestinationModal";
import BookingDestination from "@/components/bookmark/BookingDestination";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";

// The API doesn't have a highlights field yet, so we turn the
// description clauses into bullet points: "Relax on Bali's beaches,
// explore ancient temples, and enjoy sunsets." -> 3 highlights.
const getHighlights = (description: string) =>
  description
    .split(/,\s*(?:and\s+)?/)
    .map((clause) => clause.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .map((clause) => clause[0].toUpperCase() + clause.slice(1));

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const token = await getTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    notFound();
  }
  const destination: IDestination = await res.json();
  const highlights = getHighlights(destination.description);

  let isBooked = false;
  if (user?.email) {
    try {
      const bookingsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );
      if (bookingsRes.ok) {
        const bookings: IBooking[] = await bookingsRes.json();
        isBooked =
          Array.isArray(bookings) &&
          bookings.some(
            (b) =>
              b._id === destination._id ||
              b.name?.trim().toLowerCase() === destination.name?.trim().toLowerCase()
          );
      }
    } catch (err) {
      console.error("Failed to check booking status:", err);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <EditDestinationModal destination={destination} />
          <DeleteDestinationModal
            destination={destination}
          ></DeleteDestinationModal>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-8" />

      {/* Hero image */}
      <div className="overflow-hidden rounded-sm">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          width={1400}
          height={650}
          unoptimized
          className="h-72 w-full object-cover sm:h-[480px]"
        />
      </div>

      {/* Content */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left: details */}
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {destination.country}
          </p>
          <h1 className="mt-2 text-4xl font-serif sm:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <p className="flex items-center gap-1.5">
              <Star className="size-4 fill-emerald-600 text-emerald-600" />
              <span className="font-semibold">4.9</span>
              <span className="text-muted-foreground">(234 reviews)</span>
            </p>
            <p className="flex items-center gap-1.5">
              <CalendarDays className="size-4 text-muted-foreground" />
              {destination.duration}
            </p>
          </div>

          <h2 className="mt-8 text-2xl font-medium">Overview</h2>
          <p className="mt-3 max-w-2xl text-sm/relaxed text-muted-foreground">
            {destination.description}
          </p>

          <h2 className="mt-8 text-2xl font-medium">Highlights</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: booking card */}
        <BookingDestination
          destination={destination}
          isBooked={isBooked}
        />
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
