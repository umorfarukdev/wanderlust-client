import { IBooking } from "@/type/destinationsType";
import { DollarSign, Globe, LucideIcon, Plane, TrendingUp } from "lucide-react";


interface IStat {
    label: string;
    value: string;
    icon: LucideIcon;
    circleClassName: string;
}

const TravelStatistics = ({ bookings }: { bookings: IBooking[] }) => {

    const totalBookings = bookings?.length;
    const uniqueCountries = new Set(bookings?.map((b) => b.country?.trim()).filter(Boolean)).size;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingTrips = bookings.filter((b) => {
        if (!b.departureDate) return false;
        const depDate = new Date(`${b.departureDate}T00:00:00`);
        return !isNaN(depDate.getTime()) && depDate >= today;
    }).length;

    const totalSpent = bookings.reduce(
        (sum, b) => sum + (Number(b.price)),
        0
    );


    const stats: IStat[] = [
        {
            label: "Total Bookings",
            value: totalBookings.toString(),
            icon: Plane,
            circleClassName: "bg-sky-100 text-sky-500",
        },
        {
            label: "Countries Visited",
            value: uniqueCountries.toString(),
            icon: Globe,
            circleClassName: "bg-green-100 text-green-600",
        },
        {
            label: "Upcoming Trips",
            value: upcomingTrips.toString(),
            icon: TrendingUp,
            circleClassName: "bg-orange-100 text-orange-500",
        },
        {
            label: "Total Spent",
            value: totalSpent.toString(),
            icon: DollarSign,
            circleClassName: "bg-pink-100 text-pink-500",
        },
    ];
    return <section>
        <h2 className="text-xl font-semibold">Travel Statistics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className="flex items-start justify-between rounded-lg border border-border bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                    >
                        <div>
                            <p className="text-sm text-muted-foreground">
                                {stat.label}
                            </p>
                            <p className="mt-2 text-2xl font-semibold">
                                {stat.value}
                            </p>
                        </div>
                        <span
                            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${stat.circleClassName}`}
                        >
                            <Icon className="size-5" />
                        </span>
                    </div>
                );
            })}
        </div>
    </section>
}

export default TravelStatistics;