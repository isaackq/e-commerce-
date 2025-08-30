import { Transaction as TxEntity } from '@domain/entities/Transaction';
import { TransactionDocument } from '@infrastructure/schemas/transaction.schema';

export class TransactionMapper {
  static map(transactionDocument: TransactionDocument | string): TxEntity {
    const transaction = new TxEntity();
    if (typeof transactionDocument === 'string') {
      transaction.id = transactionDocument;
      return transaction;
    }
    transaction.id = transactionDocument.id;
    transaction.type = transactionDocument.type as any;
    transaction.amount = transactionDocument.amount;
    transaction.currency = transactionDocument.currency;
    transaction.sourceType = transactionDocument.sourceType;
    transaction.sourceId = transactionDocument.sourceId;
    transaction.description = transactionDocument.description;
    transaction.meta = transactionDocument.meta as any;
    transaction.createdAt = (transactionDocument as any).createdAt;
    return transaction;
  }
}
