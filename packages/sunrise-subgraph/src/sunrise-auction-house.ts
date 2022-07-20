import { BigInt, log } from '@graphprotocol/graph-ts';
import {
  AuctionBid,
  AuctionCreated,
  AuctionExtended,
  AuctionSettled,
} from '../generated/SunriseAuctionHouse/SunriseAuctionHouse';
import { Auction, Sunrise, Bid } from '../generated/schema';
import { getOrCreateAccount } from './utils/helpers';

export function handleAuctionCreated(event: AuctionCreated): void {
  const sunriseId = event.params.sunriseId.toString();

  const sunrise = Sunrise.load(sunriseId);
  if (sunrise == null) {
    log.error('[handleAuctionCreated] Sunrise #{} not found. Hash: {}', [
      sunriseId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  const auction = new Auction(sunriseId);
  auction.sunrise = sunrise.id;
  auction.amount = BigInt.fromI32(0);
  auction.startTime = event.params.startTime;
  auction.endTime = event.params.endTime;
  auction.settled = false;
  auction.save();
}

export function handleAuctionBid(event: AuctionBid): void {
  const sunriseId = event.params.sunriseId.toString();
  const bidderAddress = event.params.sender.toHex();

  const bidder = getOrCreateAccount(bidderAddress, true, true);

  const auction = Auction.load(sunriseId);
  if (auction == null) {
    log.error('[handleAuctionBid] Auction not found for Sunrise #{}. Hash: {}', [
      sunriseId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.amount = event.params.value;
  auction.bidder = bidder.id;
  auction.save();

  // Save Bid
  const bid = new Bid(event.transaction.hash.toHex());
  bid.bidder = bidder.id;
  bid.amount = auction.amount;
  bid.sunrise = auction.sunrise;
  bid.txIndex = event.transaction.index;
  bid.blockNumber = event.block.number;
  bid.blockTimestamp = event.block.timestamp;
  bid.auction = auction.id;
  bid.save();
}

export function handleAuctionExtended(event: AuctionExtended): void {
  const sunriseId = event.params.sunriseId.toString();

  const auction = Auction.load(sunriseId);
  if (auction == null) {
    log.error('[handleAuctionExtended] Auction not found for Sunrise #{}. Hash: {}', [
      sunriseId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.endTime = event.params.endTime;
  auction.save();
}

export function handleAuctionSettled(event: AuctionSettled): void {
  const sunriseId = event.params.sunriseId.toString();

  const auction = Auction.load(sunriseId);
  if (auction == null) {
    log.error('[handleAuctionSettled] Auction not found for Sunrise #{}. Hash: {}', [
      sunriseId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.settled = true;
  auction.save();
}
