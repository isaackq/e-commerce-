import { User } from './User/User';

export class Wallet {
  id?: string;
  owner: User;
  balance: number; // smallest unit (e.g., cents)
  currency: string;
}
