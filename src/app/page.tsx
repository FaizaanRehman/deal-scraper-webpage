"use client";

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

    useEffect(() => {
        async function fetchDeals() {
            const response = await fetch('/api/deals');
            const data = await response.json();
            setDeals(data);
        }
        fetchDeals();
    }, []);

    return (
        <div>
            <h1>Upcoming Deals</h1>
            <ul>
                {deals.map(deal => (
                    <li key={deal.id}>
                        <a href={deal.url} target="_blank" rel="noopener noreferrer">{deal.caption}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}