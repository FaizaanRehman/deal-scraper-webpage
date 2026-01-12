'use client';

import { useEffect, useState } from 'react';
import Deal from '@/types/deal';
import DealCard from '@/components/DealCard';

type DealResponse = {
  current: Deal[];
  upcoming: Deal[];
};

export default function Home() {
  const [deals, setDeals] = useState<DealResponse>({
    current: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch('/api/deals');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        setDeals({
          current: data.current ?? [],
          upcoming: data.upcoming ?? [],
        });
      } catch (error) {
        console.error('Error fetching deals:', error);
        setDeals({ current: [], upcoming: [] }); // fallback to empty arrays
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {loading ? (
          <p className="text-center text-gray-500">Loading deals...</p>
        ) : (
          <>
            {/* Current Deals */}
            {deals.current.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Current Deals
                </h2>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {deals.current.map((deal) => (
                    <DealCard key={deal.id} deal={deal} showStartDate={false} showEndDate={true}/>
                  ))}
                </ul>
              </section>
            )}

            {/* Upcoming Deals */}
            {deals.upcoming.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Upcoming Deals
                </h2>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {deals.upcoming.map((deal) => (
                    <DealCard key={deal.id} deal={deal} showStartDate={true} showEndDate={false}/>
                  ))}
                </ul>
              </section>
            )}

            {deals.current.length === 0 && deals.upcoming.length === 0 && (
              <p className="text-center text-gray-500">
                No deals at the moment. Check back soon!
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
