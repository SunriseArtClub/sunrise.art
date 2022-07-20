import { Auction } from '../wrappers/sunriseAuction';
import { AuctionState } from '../state/slices/auction';
import { BigNumber } from '@ethersproject/bignumber';

export const isSunriseSun = (sunriseId: BigNumber) => {
  return sunriseId.mod(10).eq(0);
};

const emptySunriseAuction = (onDisplayAuctionId: number): Auction => {
  return {
    amount: BigNumber.from(0).toJSON(),
    bidder: '',
    startTime: BigNumber.from(0).toJSON(),
    endTime: BigNumber.from(0).toJSON(),
    sunriseId: BigNumber.from(onDisplayAuctionId).toJSON(),
    settled: false,
  };
};

const findAuction = (id: BigNumber, auctions: AuctionState[]): Auction | undefined => {
  return auctions.find(auction => {
    return BigNumber.from(auction.activeAuction?.sunriseId).eq(id);
  })?.activeAuction;
};

/**
 *
 * @param sunriseId
 * @param pastAuctions
 * @returns empty `Auction` object with `startTime` set to auction after param `sunriseId`
 */
export const generateEmptySunriseAuction = (
  sunriseId: BigNumber,
  pastAuctions: AuctionState[],
): Auction => {
  const sunriseAuction = emptySunriseAuction(sunriseId.toNumber());
  // use sunriseAuction.sunriseId + 1 to get mint time
  const auctionAbove = findAuction(sunriseId.add(1), pastAuctions);
  const auctionAboveStartTime = auctionAbove && BigNumber.from(auctionAbove.startTime);
  if (auctionAboveStartTime) sunriseAuction.startTime = auctionAboveStartTime.toJSON();

  return sunriseAuction;
};
