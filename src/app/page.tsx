'use client';

import { useEffect, useState, useRef } from 'react';
import { useDemoMode } from '@/context/DemoModeProvider';
import DealResponse from '@/types/dealResponse';
import DealCard from '@/components/DealCard';
import { demoDeals } from '@/lib/demoDeals';
import { isDateSoon } from '@/lib/dateFormatters';

export default function Home() {
  const [deals, setDeals] = useState<DealResponse>({
    current: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const storedSeenDeals = useRef<Set<number>>(new Set()); // deal seen in previous sessions
  const seenDeals = useRef<Set<number>>(new Set()); // deals seen in current session (starts with storedSeenDeals, adds new ones as we fetch)
  const { isDemoMode } = useDemoMode();

  // Load seenDeals from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('seenDeals');
    if (stored) {
      storedSeenDeals.current = new Set(JSON.parse(stored));
      seenDeals.current = storedSeenDeals.current; // start with same set, will add new ones as we fetch
    }
  }, []);

  useEffect(() => {
    async function fetchDeals() {
      if (isDemoMode) {
        setDeals(demoDeals);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('/api/deals');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        setDeals({
          current: data.current ?? [],
          upcoming: data.upcoming ?? [],
        });

        // Update seenDeals
        [...(data.current ?? []), ...(data.upcoming ?? [])].forEach((deal) => {
          seenDeals.current.add(deal.id);
        });
      } catch (error) {
        console.error('Error fetching deals:', error);
        setDeals({ current: [], upcoming: [] }); // fallback to empty arrays
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, [isDemoMode]);

  // Save seenDeals to localStorage on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        'seenDeals',
        JSON.stringify(Array.from(seenDeals.current))
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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
                      isNew={!storedSeenDeals.current.has(deal.id)}
                      isEndingSoon={isDateSoon(new Date(deal.endsAt))}
                      isDemo={isDemoMode}
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
                      isNew={!storedSeenDeals.current.has(deal.id)}
                      isEndingSoon={isDateSoon(new Date(deal.endsAt))} // ending within 24 hours
                      isDemo={isDemoMode}
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
