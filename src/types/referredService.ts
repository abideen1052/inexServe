import { ServiceItem } from '../components/listItem';

export interface ReferredService extends ServiceItem {
  referralId: string;
  referredName: string;
  referredEmail: string;
  userId?: string;
}
