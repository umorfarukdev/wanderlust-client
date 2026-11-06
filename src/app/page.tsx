import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Testimonials } from "@/components/home/testimonials";
import { CallToAction } from "@/components/home/cta";
import FeturedDestinations from "@/components/home/FeturedDestinations";

export default function Home() {
  return (
    <>
      <main className="flex-1 w-full overflow-x-hidden">
        <Banner />
        <FeturedDestinations></FeturedDestinations>
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
    </>
  );
}
