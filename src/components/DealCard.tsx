import React from 'react';
import Image from 'next/image';
import { Video, Layers } from 'lucide-react';
import Deal from '@/types/deal';
import { InstagramMediaType } from '@prisma/client';
import { formatRelativeDate } from '@/lib/dateFormatters';

interface DealCardProps {
  deal: Deal;
  showStartDate?: boolean; // optional, defaults to true
  showEndDate?: boolean;   // optional, defaults to true
}

const DealCard: React.FC<DealCardProps> = ({ deal, showStartDate = true, showEndDate = true }) => {
  return (
    <li className="overflow-hidden rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
      <a
        href={deal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Image preview */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={deal.imageUrl}
            alt="Instagram preview"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority={false}
          />

          {/* Optional media type indicator */}
          {deal.mediaType !== InstagramMediaType.IMAGE && (
            <span className="absolute bottom-2 right-2 rounded bg-black/70 p-1.5 text-white">
              {deal.mediaType === InstagramMediaType.VIDEO ? (
                <Video size={20} />
              ) : (
                <Layers size={20} />
              )}
            </span>
          )}
        </div>

        {/* Dates */}
        <div className="mt-2 space-y-1 text-sm text-gray-500">
          {showStartDate && deal.startsAt && (
            <p>{formatRelativeDate(new Date(deal.startsAt), 'Starts')}</p>
          )}
          {showEndDate && deal.endsAt && (
            <p>{formatRelativeDate(new Date(deal.endsAt), 'Ends')}</p>
          )}
        </div>
      </a>
    </li>
  );
};

export default DealCard;
