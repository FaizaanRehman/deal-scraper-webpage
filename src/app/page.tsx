'use client';

import { useEffect, useState } from 'react';
import Deal from '@/types/deal';
import DealCard from '@/components/DealCard';

export default function Home() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch('/api/deals');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setDeals([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Deals</h1>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading deals...</p>
        ) : deals.length === 0 ? (
          <p className="text-center text-gray-500">
            No deals at the moment. Check back soon!
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
