'use client';

import { useEffect, useState, useRef } from 'react';
import { useDemoMode } from '@/context/DemoModeProvider';
import DealResponse from '@/types/dealResponse';
import DealCard from '@/components/DealCard';
import { demoDeals } from '@/lib/demoDeals';
import { isDateSoon, hasDatePassed } from '@/lib/dateFormatters';

const STORAGE_KEY_LAST_VISITED = 'lastVisited';

export default function Home() {
  const [deals, setDeals] = useState<DealResponse>({
    current: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const sessionStart = useRef<Date>(new Date());
  const [lastVisited, setLastVisitedAt] = useState<Date>(new Date(0)); // default to epoch start for first-time visitors
  const { isDemoMode } = useDemoMode();

  // Load lastVisited from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_LAST_VISITED);
    if (stored) {
      setLastVisitedAt(new Date(stored));
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
        STORAGE_KEY_LAST_VISITED,
        sessionStart.current.toISOString()
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
                      isNew={lastVisited < new Date(deal.createdAt)} // consider "new" if created after last visit
                      isEndingSoon={isDateSoon(new Date(deal.endsAt))}
                      hasEnded={hasDatePassed(new Date(deal.endsAt))}
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
                      isNew={lastVisited < new Date(deal.createdAt)} // consider "new" if created after last visit
                      isEndingSoon={isDateSoon(new Date(deal.endsAt))} // ending within 24 hours
                      hasEnded={hasDatePassed(new Date(deal.endsAt))} // end date in the past
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
