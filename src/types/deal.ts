import { InstagramMediaType } from '@prisma/client';

// Intended for Frontend use only
export interface Deal {
  id: number;
  caption: string;
  title: string;
  url: string;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  mediaType: InstagramMediaType;
}

export default Deal;
