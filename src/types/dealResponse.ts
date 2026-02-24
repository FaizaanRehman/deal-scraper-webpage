import { Deal } from '@/types/deal';

export type DealResponse = {
  current: Deal[];
  upcoming: Deal[];
};

export default DealResponse;
