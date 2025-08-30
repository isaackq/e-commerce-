import { Wallet } from '@domain/entities/Wallet';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface WalletRepositoryInterface extends FindOneRepositoryInterface<Wallet> {
  save(ownerId: string, currency?: string): Promise<Wallet>;
  findByOwner(ownerId: string): Promise<Wallet | null>;
  credit(
    ownerId: string,
    amount: number,
    options?: {
      description?: string;
      sourceType?: string;
      sourceId?: string;
      currency?: string;
      meta?: Record<string, string>;
    },
  ): Promise<void>;
  debit(
    ownerId: string,
    amount: number,
    options?: { description?: string; sourceType?: string; sourceId?: string; meta?: Record<string, string> },
  ): Promise<void>;
  getBalance(ownerId: string): Promise<{ balance: number; currency: string }>;
}
