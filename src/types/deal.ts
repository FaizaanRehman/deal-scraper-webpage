import { InstagramMediaType } from '@prisma/client';

export interface Deal {
  id: number;
  caption: string;
  url: string;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
  mediaType: InstagramMediaType;
}

export default Deal;
