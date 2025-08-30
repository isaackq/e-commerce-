import { Wallet } from './Wallet';
import { TransactionType } from '../enums/transaction-type.enum';

export class Transaction {
  id?: string;
  wallet: Wallet;
  type: TransactionType;
  amount: number; // smallest unit
  currency: string;
  sourceType?: string;
  sourceId?: string;
  description?: string;
  meta?: Record<string, string>;
  createdAt?: Date;
}
