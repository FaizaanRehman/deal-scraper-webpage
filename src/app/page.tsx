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
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p
              className="animate-pulse"
              style={{ color: 'var(--color-muted)' }}
            >
              Loading deals...
            </p>
          </div>
        ) : (
          <>
            {/* Current Deals */}
            {deals.current.length > 0 && (
              <section className="mb-10">
                <div className="mb-6 flex items-center">
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{
                      color: 'var(--color-foreground)',
                    }}
                  >
                    Current Deals
                  </h2>
                </div>

                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {deals.current.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      showStartDate={false}
                      showEndDate={true}
                    />
                  ))}
                </ul>
              </section>
            )}

            {/* Upcoming Deals */}
            {deals.upcoming.length > 0 && (
              <section className="mb-10">
                <div className="mb-6 flex items-center">
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{
                      color: 'var(--color-foreground)',
                    }}
                  >
                    Upcoming Deals
                  </h2>
                </div>
                <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {deals.upcoming.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      showStartDate={true}
                      showEndDate={false}
                    />
                  ))}
                </ul>
              </section>
            )}

            {deals.current.length === 0 && deals.upcoming.length === 0 && (
              <div className="flex items-center justify-center py-20">
                <p
                  className="animate-pulse"
                  style={{ color: 'var(--color-muted)' }}
                >
                  No deals at the moment. Check back soon!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
