"use client"
import { getTokenClient } from "@/lib/getTokenClient";
import { IBooking } from "@/type/destinationsType";
import { CalendarDays, Eye, MapPin, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const BookingDestinationCard = ({ booking }: { booking: IBooking }) => {
  const router = useRouter()
  console.log(booking);
  const handleCancelBooking = async () => {
    const token = await getTokenClient();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
    const data = await res.json()
    console.log(data);

    if (res.ok) {
      toast.success("Booking cancelled successfully!");
      router.refresh();
    } else {
      toast.error(data?.message || "Failed to cancel booking");
    }
  }
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-white p-3 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:gap-4">
      {/* Image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-md sm:h-[110px] sm:w-[184px]">
        <Image
          src={booking.imageUrl}
          alt={booking.name}
          fill
          sizes="(max-width: 640px) 100vw, 184px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {/* {status} */}
        </span>

        <h2 className="truncate text-lg font-medium leading-tight text-gray-900">
          {booking.name}
        </h2>

        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-500">
          <CalendarDays size={12} />
          Departure:{" "}
          {new Date(`${booking.departureDate}T00:00:00`).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          )}
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-500">
          <MapPin size={12} />
          Booking ID: {booking._id.slice(-6)}
        </p>

        <p className="mt-1 text-xl font-medium leading-tight text-cyan-600">
          ${booking.price}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex shrink-0 items-center justify-end gap-2 sm:self-end">
        <button
          type="button"
          onClick={handleCancelBooking}
          className="inline-flex items-center gap-1 border border-red-300 px-2.5 py-1.5 text-[11px] text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={11} />
          Cancel
        </button>

        <Link href={`/destinations/${booking._id}`}
          className="inline-flex items-center gap-1 bg-cyan-600 px-2.5 py-1.5 text-[11px] text-white transition hover:bg-cyan-700"
        >
          <Eye size={11} />
          View
        </Link>
      </div>
    </div>
  );
};

export default BookingDestinationCard;
