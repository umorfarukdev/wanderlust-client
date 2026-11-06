import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[550px] sm:min-h-[640px] lg:min-h-[700px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/Banner.png"
        alt="Beautiful travel destination"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero Content — flex-1 keeps it centered in the space above the form */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-4 py-28 text-center text-white sm:py-16 lg:py-24">
        <h1 className="max-w-4xl font-serif text-4xl leading-tight sm:text-6xl md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-sm/relaxed sm:text-base/relaxed">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button className="h-11 bg-[#14b8b0] px-7 text-sm font-semibold tracking-wide text-white uppercase hover:bg-[#0fa39c]">
            Explore Now
            <ArrowRight className="size-4" />
          </Button>
          <Button className="h-11 border border-white/40 bg-white/20 px-7 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm hover:bg-white/30">
            View Destination
          </Button>
        </div>
      </div>

      {/* Search Form — in flow, pinned to the banner bottom at every size */}
      <form className="relative z-10 flex w-full flex-col bg-black/25 backdrop-blur-md sm:flex-row">
        {searchFields.map((field, index) => (
          <label
            key={field.label}
            className={`group flex min-w-0 flex-1 cursor-pointer flex-col justify-center gap-1 px-5 py-3 transition-colors hover:bg-black/20 focus-within:bg-black/30 sm:py-5 ${
              index > 0 ? "border-t border-white/20 sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <span className="text-base font-semibold text-white">
              {field.label}
            </span>
            <input
              type="text"
              name={field.label}
              defaultValue={field.value}
              className="w-full bg-transparent text-xs text-white/80 placeholder:text-white/60 focus:text-white focus:outline-none"
            />
          </label>
        ))}
        <Button
          type="submit"
          className="h-14 w-full flex-none rounded-none bg-[#3fd0c9] font-semibold text-[#0b5f5b] hover:bg-[#35c4bd] sm:h-auto sm:w-44"
        >
          Search
        </Button>
      </form>
    </section>
  );
}
