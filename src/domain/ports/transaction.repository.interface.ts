import { Transaction } from '@domain/entities/Transaction';
import { TransactionType } from '@domain/enums/transaction-type.enum';

export interface TransactionRepositoryInterface {
  list(
    ownerId: string,
    filter?: { type?: TransactionType; limit?: number; offset?: number },
  ): Promise<{ total: number; items: Transaction[] }>;
}
