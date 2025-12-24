import React from 'react';
import Deal from '@/types/deal';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <li className="rounded-lg bg-white p-4 shadow-sm transition  hover:shadow-md">
      <a
        href={deal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <h2 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-5">
          {deal.caption}
        </h2>

        <p className="text-sm text-gray-500">
          Ends on {new Date(deal.endsAt).toLocaleDateString()}
        </p>
      </a>
    </li>
  );
};

export default DealCard;
