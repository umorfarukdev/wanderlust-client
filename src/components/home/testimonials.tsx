import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
  {
    quote:
      "Cherry Blossom Season In Japan Was A Dream. Every Detail Was Handled, From The Ryokan Stays To The Guided Temple Walks. Truly Spectacular.",
    name: "David Okafor",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Santorini Sunsets Are Even Better In Person. Our Ferry Hops Between The Islands Were Flawless And The Local Food Tours Were A Highlight.",
    name: "Elena Petrova",
    location: "Berlin, Germany",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Machu Picchu At Sunrise Will Stay With Me Forever. The Team Handled Permits, Trains And Hotels So We Could Just Absorb The Wonder.",
    name: "James Rodriguez",
    location: "Sydney, Australia",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "The Maldives Overwater Villa Was Pure Magic. Snorkeling With Manta Rays And The Private Sunset Cruise Made Our Honeymoon Unforgettable.",
    name: "Maya Patel",
    location: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Our Safari In Kenya Was Beyond Words. Expert Guides, Beautiful Camps And Watching The Great Migration From A Hot Air Balloon.",
    name: "Daniel Mensah",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Carousel
          opts={{ align: "start" }}
          className="w-full"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl text-foreground sm:text-5xl font-serif">
                What Travelers Say
              </h2>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Real experiences from our happy travelers
              </p>
            </div>

            {/* Overridden from absolute positioning to static so they rest in the header row */}
            <div className="flex shrink-0 gap-3">
              <CarouselPrevious className="static top-0 left-0 my-0 size-11 border-border text-foreground/60 hover:border-[#14b8b0] hover:text-[#0f9b96]" />
              <CarouselNext className="static top-0 left-0 my-0 size-11 border-border text-foreground/60 hover:border-[#14b8b0] hover:text-[#0f9b96]" />
            </div>
          </div>

          <CarouselContent className="mt-8">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full sm:basis-1/2"
              >
                <article className="flex h-full border border-border bg-white">
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <blockquote className="text-lg leading-snug font-medium">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <div className="mt-6">
                      <p className="font-medium text-[#14b8b0]">
                        — {testimonial.name}
                      </p>
                      <p className="mt-0.5 pl-3.5 text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="relative hidden aspect-[3/4] w-36 shrink-0 self-center sm:block md:w-40">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
