'use client';

import { useEffect, useState } from 'react';

interface Deal {
  id: number;
  caption: string;
  url: string;
  startsAt: string;
  endsAt: string;
}

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
    <div>
      <h1>Upcoming Deals</h1>
      {loading ? (
        <p>Loading deals...</p>
      ) : deals.length === 0 ? (
        <p>No deals at the moment. Check back soon!</p>
      ) : (
        <ul>
          {deals.map((deal) => (
            <li key={deal.id}>
              <a href={deal.url} target="_blank" rel="noopener noreferrer">
                {deal.caption}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
