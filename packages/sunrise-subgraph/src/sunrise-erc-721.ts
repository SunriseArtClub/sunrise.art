import { log } from '@graphprotocol/graph-ts';
import { SunriseCreated, Transfer } from '../generated/SunriseToken/SunriseToken';
import { BIGINT_ONE, BIGINT_ZERO, ZERO_ADDRESS } from './utils/constants';
import { getOrCreateAccount } from './utils/helpers';
import { Sunrise } from '../generated/schema';

export function handleSunriseCreated(event: SunriseCreated): void {
  const sunriseId = event.params.tokenId.toString();

  const sunrise = Sunrise.load(sunriseId);
  if (sunrise == null) {
    log.error('[handleSunriseCreated] Sunrise #{} not found. Hash: {}', [
      sunriseId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  sunrise.save();
}

let transferredSunriseId: string; // Use WebAssembly global due to lack of closure support
export function handleTransfer(event: Transfer): void {
  const fromHolder = getOrCreateAccount(event.params.from.toHexString(), true, true);
  const toHolder = getOrCreateAccount(event.params.to.toHexString(), true, true);
  transferredSunriseId = event.params.tokenId.toString();

  // fromHolder
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    fromHolder.tokenBalanceRaw = fromHolder.tokenBalanceRaw - BIGINT_ONE;
    fromHolder.tokenBalance = fromHolder.tokenBalanceRaw;
    const fromHolderSunrises = fromHolder.sunrises; // Re-assignment required to update array
    fromHolder.sunrises = fromHolderSunrises.filter(n => n !== transferredSunriseId);

    if (fromHolder.tokenBalanceRaw < BIGINT_ZERO) {
      log.error('Negative balance on holder {} with balance {}', [
        fromHolder.id,
        fromHolder.tokenBalanceRaw.toString(),
      ]);
    }

    fromHolder.save();
  }

  toHolder.tokenBalanceRaw = toHolder.tokenBalanceRaw + BIGINT_ONE;
  toHolder.tokenBalance = toHolder.tokenBalanceRaw;
  toHolder.totalTokensHeldRaw = toHolder.totalTokensHeldRaw + BIGINT_ONE;
  toHolder.totalTokensHeld = toHolder.totalTokensHeldRaw;
  const toHolderSunrises = toHolder.sunrises; // Re-assignment required to update array
  toHolderSunrises.push(event.params.tokenId.toString());
  toHolder.sunrises = toHolderSunrises;

  let sunrise = Sunrise.load(transferredSunriseId);
  if (sunrise == null) {
    sunrise = new Sunrise(transferredSunriseId);
  }

  sunrise.owner = toHolder.id;
  sunrise.save();

  toHolder.save();
}
