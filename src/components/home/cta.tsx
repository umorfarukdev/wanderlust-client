import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="relative flex min-h-72 items-center justify-center overflow-hidden py-16 sm:min-h-80">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 flex flex-col items-center px-4 text-center text-white">
        <h2 className="text-3xl text-white sm:text-5xl font-serif">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-8 h-11 bg-white px-7 text-sm font-semibold tracking-wide text-foreground uppercase hover:bg-white/90">
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
