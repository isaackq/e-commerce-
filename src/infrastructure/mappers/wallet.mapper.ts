import { Wallet as WalletEntity } from '@domain/entities/Wallet';
import { User } from '@domain/entities/User/User';
import { Wallet as WalletSchema, WalletDocument } from '@infrastructure/schemas/wallet.schema';
import { UserMapper } from './user.maper';

export class WalletMapper {
  static map(WalletDocument: WalletDocument | 'string'): WalletEntity | null {
    const wallet = new WalletEntity();
    if (typeof WalletDocument === 'string') {
      wallet.id = WalletDocument;
      return wallet;
    }
    wallet.id = WalletDocument.id;

    const user = UserMapper.map(WalletDocument.owner as any);
    wallet.owner = user;

    wallet.balance = WalletDocument.balance;

    wallet.currency = WalletDocument.currency;

    return wallet;
  }
}
