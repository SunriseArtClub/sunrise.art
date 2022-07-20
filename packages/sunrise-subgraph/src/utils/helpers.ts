import { Account } from '../../generated/schema';
import { BIGINT_ZERO } from './constants';

export function getOrCreateAccount(id: string, createIfNotFound: boolean, save: boolean): Account {
  let tokenHolder = Account.load(id);

  if (tokenHolder == null && createIfNotFound) {
    tokenHolder = new Account(id);
    tokenHolder.tokenBalanceRaw = BIGINT_ZERO;
    tokenHolder.tokenBalance = BIGINT_ZERO;
    tokenHolder.totalTokensHeldRaw = BIGINT_ZERO;
    tokenHolder.totalTokensHeld = BIGINT_ZERO;
    tokenHolder.sunrises = [];

    if (save) {
      tokenHolder.save();
    }
  }

  return tokenHolder as Account;
}
