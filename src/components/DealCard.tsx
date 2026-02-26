import React from 'react';
import Image from 'next/image';
import { Video, Layers, CalendarIcon } from 'lucide-react';
import Deal from '@/types/deal';
import CardBadge from '@/components/CardBadge';
import { InstagramMediaType } from '@prisma/client';
import { formatRelativeDate } from '@/lib/dateFormatters';

interface DealCardProps {
  deal: Deal;
  showStartDate?: boolean; // optional, defaults to true
  showEndDate?: boolean; // optional, defaults to true
  isNew?: boolean; // optional, for "new" badge
  isEndingSoon?: boolean; // optional, for "ending soon" badge
  isDemo?: boolean; // optional, for demo mode badge
}

const DealCard: React.FC<DealCardProps> = ({
  deal,
  showStartDate = true,
  showEndDate = true,
  isNew = false,
  isEndingSoon = false,
  isDemo = false,
}) => {
  isNew = isDemo ? deal.id % 2 === 1 : isNew; // For demo mode, mark even ID deals as new

  return (
    <li
      className="relative overflow-hidden rounded-xl p-4 shadow-md border transition hover:shadow-xl hover:scale-[1.02] duration-200"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-card-border)',
        color: 'var(--color-foreground)',
      }}
    >
      <a
        href={deal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Image preview */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
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
            <span className="absolute bottom-2 right-2 rounded-full bg-black/70 p-2 text-white">
              {deal.mediaType === InstagramMediaType.VIDEO ? (
                <Video size={20} />
              ) : (
                <Layers size={20} />
              )}
            </span>
          )}
        </div>

        {/* Title */}
        {deal.title && (
          <h3 className="mt-3 line-clamp-2 text-base sm:text-lg font-semibold">
            {deal.title}
          </h3>
        )}

        {/* Dates */}
        <div
          className="mt-2 space-y-1 text-sm"
          style={{ color: 'var(--color-muted)' }}
        >
          {showStartDate && deal.startsAt && (
            <span className="flex items-center gap-1.5">
              <CalendarIcon size={16} className="opacity-70 mb-0.5" />
              {formatRelativeDate(new Date(deal.startsAt), 'Starts')}
            </span>
          )}
          {showEndDate && deal.endsAt && (
            <span className="flex items-center gap-1.5">
              <CalendarIcon size={16} className="opacity-70 mb-0.5" />
              {formatRelativeDate(new Date(deal.endsAt), 'Ends')}
            </span>
          )}
        </div>

        {/* Badges Container */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {isDemo && <CardBadge text="DEMO" bgColor="bg-purple-600" />}
          {isNew && <CardBadge text="NEW" bgColor="bg-green-600" />}
          {isEndingSoon && (
            <CardBadge text="ENDS SOON" bgColor="bg-orange-600" />
          )}
        </div>
      </a>
    </li>
  );
};

export default DealCard;
