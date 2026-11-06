import IDestination from "@/type/destinationsType";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

const DestinationsCard = ({ destination }: { destination: IDestination }) => {
  return (
    <div className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xs bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]">
        <div className="relative">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            width={800}
            height={500}
            unoptimized
            className="aspect-[8/5] w-full object-cover"
          />
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium">
            {destination.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {destination.country}
          </p>

          <div className="mt-1 flex items-start justify-between gap-3">
            <h3 className="text-lg leading-snug font-medium">
              {destination.name}
            </h3>
            <p className="shrink-0 text-lg font-medium">
              ${destination.price.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground">
                /Person
              </span>
            </p>
          </div>

          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {destination.duration}
          </p>

          <Link
            href={`/destinations/${destination._id}`}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium tracking-wide text-[#0f9b96] uppercase underline decoration-1 underline-offset-4 transition-colors hover:text-[#14b8b0]"
          >
            Book Now
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default DestinationsCard;
