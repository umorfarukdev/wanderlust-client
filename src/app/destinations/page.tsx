import DestinationsCard from "@/components/destinations/DestinationsCard";
import IDestination from "@/type/destinationsType";

const DestinationsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
    cache: "no-store",
  });
  const destinations: IDestination[] = await res.json();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm text-muted-foreground">
        Showing {destinations.length} destinations
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationsCard key={destination._id} destination={destination}></DestinationsCard>
        ))}
      </div>
    </main>
  );
};

export default DestinationsPage;
