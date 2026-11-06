import IDestination from '@/type/destinationsType';
import React from 'react';
import FeaturedCarousel from './featured-carousel';

const FeturedDestinations = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feture-destinations`);
    const destinations: IDestination[] = await res.json();
    return (
        <section className='mx-auto w-full max-w-7xl px-4 py-10 sm:px-6'>
            <h1 className='text-3xl font-bold text-center mb-4'>Featured Destinations</h1>
            <p className='text-center text-muted-foreground'>Handpicked travel experiences for the adventure seekers</p>
            <div className='mt-8'>
                {destinations.length > 0 ? (
                    <FeaturedCarousel destinations={destinations} />
                ) : (
                    <p className='text-center text-muted-foreground'>No featured destinations yet.</p>
                )}
            </div>
        </section>
    );
};

export default FeturedDestinations;
