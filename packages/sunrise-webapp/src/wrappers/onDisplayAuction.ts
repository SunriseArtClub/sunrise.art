import { BigNumber } from '@ethersproject/bignumber';
import { useAppSelector } from '../hooks';
import { generateEmptySunriseAuction, isSunriseSun } from '../utils/sunriseSun';
import { Bid, BidEvent } from '../utils/types';
import { Auction } from './sunriseAuction';

const deserializeAuction = (reduxSafeAuction: Auction): Auction => {
  return {
    amount: BigNumber.from(reduxSafeAuction.amount),
    bidder: reduxSafeAuction.bidder,
    startTime: BigNumber.from(reduxSafeAuction.startTime),
    endTime: BigNumber.from(reduxSafeAuction.endTime),
    sunriseId: BigNumber.from(reduxSafeAuction.sunriseId),
    settled: false,
  };
};

const deserializeBid = (reduxSafeBid: BidEvent): Bid => {
  return {
    sunriseId: BigNumber.from(reduxSafeBid.sunriseId),
    sender: reduxSafeBid.sender,
    value: BigNumber.from(reduxSafeBid.value),
    extended: reduxSafeBid.extended,
    transactionHash: reduxSafeBid.transactionHash,
    timestamp: BigNumber.from(reduxSafeBid.timestamp),
  };
};
const deserializeBids = (reduxSafeBids: BidEvent[]): Bid[] => {
  return reduxSafeBids
    .map(bid => deserializeBid(bid))
    .sort((a: Bid, b: Bid) => {
      return b.timestamp.toNumber() - a.timestamp.toNumber();
    });
};

const useOnDisplayAuction = (): Auction | undefined => {
  const lastAuctionSunriseId = useAppSelector(state => state.auction.activeAuction?.sunriseId);
  const onDisplayAuctionSunriseId = useAppSelector(
    state => state.onDisplayAuction.onDisplayAuctionSunriseId,
  );
  const currentAuction = useAppSelector(state => state.auction.activeAuction);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  if (
    onDisplayAuctionSunriseId === undefined ||
    lastAuctionSunriseId === undefined ||
    currentAuction === undefined ||
    !pastAuctions
  )
    return undefined;

  // current auction
  if (BigNumber.from(onDisplayAuctionSunriseId).eq(lastAuctionSunriseId)) {
    return deserializeAuction(currentAuction);
  } else {
    // Sunrise auction
    if (isSunriseSun(BigNumber.from(onDisplayAuctionSunriseId))) {
      const emptySunrisederAuction = generateEmptySunriseAuction(
        BigNumber.from(onDisplayAuctionSunriseId),
        pastAuctions,
      );

      return deserializeAuction(emptySunrisederAuction);
    } else {
      // past auction
      const reduxSafeAuction: Auction | undefined = pastAuctions.find(auction => {
        const sunriseId = auction.activeAuction && BigNumber.from(auction.activeAuction.sunriseId);
        return sunriseId && sunriseId.toNumber() === onDisplayAuctionSunriseId;
      })?.activeAuction;

      return reduxSafeAuction ? deserializeAuction(reduxSafeAuction) : undefined;
    }
  }
};

export const useAuctionBids = (auctionSunriseId: BigNumber): Bid[] | undefined => {
  const lastAuctionSunriseId = useAppSelector(state => state.onDisplayAuction.lastAuctionSunriseId);
  const lastAuctionBids = useAppSelector(state => state.auction.bids);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  // auction requested is active auction
  if (lastAuctionSunriseId === auctionSunriseId.toNumber()) {
    return deserializeBids(lastAuctionBids);
  } else {
    // find bids for past auction requested
    const bidEvents: BidEvent[] | undefined = pastAuctions.find(auction => {
      const sunriseId = auction.activeAuction && BigNumber.from(auction.activeAuction.sunriseId);
      return sunriseId && sunriseId.eq(auctionSunriseId);
    })?.bids;

    return bidEvents && deserializeBids(bidEvents);
  }
};

export default useOnDisplayAuction;