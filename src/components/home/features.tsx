import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function Features() {
  return (
    <section id="destinations" className="bg-[#d9f3f8] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-4xl text-foreground sm:text-5xl font-serif">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-7 sm:p-9">
              <Image
                src={feature.icon}
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              <h3 className="mt-5 text-xl font-medium sm:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm/relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
