"use client";

import DestinationsCard from "@/components/destinations/DestinationsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import IDestination from "@/type/destinationsType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

const FeaturedCarousel = ({
  destinations,
}: {
  destinations: IDestination[];
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(
    destinations.length > 1,
  );

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setScrollProgress(api.scrollProgress());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);
    api.on("scroll", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      api.off("scroll", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: false,
        containScroll: "trimSnaps",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-3">
        {destinations.map((destination) => (
          <CarouselItem
            key={destination._id}
            className="basis-[80%] pl-3 sm:basis-1/2 lg:basis-[calc(33.333%-0.5rem)]"
          >
            <DestinationsCard destination={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Progress + controls */}
      <div className="mt-6 flex items-center gap-4">
        <span className="shrink-0 text-base font-medium tabular-nums">
          {selectedIndex + 1}/{destinations.length}
        </span>

        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-300 ease-out"
            style={{
              width: `${Math.min(Math.max(scrollProgress, 0.02), 1) * 100}%`,
            }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </Carousel>
  );
};

export default FeaturedCarousel;
