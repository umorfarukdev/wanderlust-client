"use client";
import { useSession } from "@/lib/auth-client";
import { getTokenClient } from "@/lib/getTokenClient";
import IDestination from "@/type/destinationsType";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

interface BookingDestinationProps {
  destination: IDestination;
  isBooked?: boolean;
}

const BookingDestination = ({
  destination,
  isBooked = false,
}: BookingDestinationProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleBookmarkDestinationAdd = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please sign in to book this destination.");
      return;
    }

    // Check if already booked
    if (isBooked) {
      toast.warn("This destination is already added to your bookings!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate");
    const data = {
      userName: user?.name,
      email: user?.email,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    const token = await getTokenClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const bookingData = await res.json();
    console.log(bookingData);

    if (res.ok) {
      if (
        bookingData?.insertedId === null ||
        bookingData?.message?.toLowerCase().includes("already")
      ) {
        toast.warn(
          bookingData?.message || "This destination is already booked!"
        );
      } else {
        toast.success("Booking confirmed! Your trip is reserved.");
        router.refresh();
      }
    } else {
      const errMsg = bookingData?.message || "";
      if (
        res.status === 409 ||
        errMsg.toLowerCase().includes("already") ||
        errMsg.toLowerCase().includes("exist") ||
        errMsg.toLowerCase().includes("duplicate")
      ) {
        toast.warn(errMsg || "This destination is already booked!");
      } else {
        toast.error(errMsg || "Failed to book the destination");
      }
    }
  };
  return (
    <aside>
      <div className="rounded-lg border border-border bg-white p-5">
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="mt-1 text-4xl font-semibold text-[#14b8b0]">
          ${destination.price.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">per person</p>

        <form onSubmit={handleBookmarkDestinationAdd}>
          <input
            type="date"
            name="departureDate"
            defaultValue={destination.departureDate}
            className="mt-5 w-full rounded-md bg-muted px-3 py-2.5 text-sm text-muted-foreground"
          />

          {isBooked && (
            <div className="mt-3 flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
              <Check className="size-4 shrink-0 text-amber-600" />
              <span>You have already booked this destination.</span>
            </div>
          )}

          <button
            type="submit"
            className={`mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold uppercase tracking-wide transition-colors ${
              isBooked
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-[#14b8b0] text-white hover:bg-[#0fa39c]"
            }`}
          >
            {isBooked ? (
              <>
                Already Booked
                <Check className="size-4" />
              </>
            ) : (
              <>
                Book Now
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 border-t border-border pt-5" />

        <ul className="grid gap-2.5 text-sm">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5">
              <Check className="size-4 shrink-0 text-emerald-600" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BookingDestination;
