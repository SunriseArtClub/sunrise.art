import React from 'react';
import classes from './AuctionNavigation.module.css';
import AuctionActivityDateHeadline from '../AuctionActivityDateHeadline';

const AuctionNavigation: React.FC<{
  auction: any;
  title: string;
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
}> = props => {
  const { title, isFirstAuction, isLastAuction, onPrevAuctionClick, onNextAuctionClick } = props;
  return (
    <div className={classes.auctionNav}>
      <button
        onClick={() => onPrevAuctionClick()}
        className={classes.leftArrow}
        disabled={isFirstAuction}
      >
        ←
      </button>
      <AuctionActivityDateHeadline title={title} />
      <button
        onClick={() => onNextAuctionClick()}
        className={classes.rightArrow}
        disabled={isLastAuction}
      >
        →
      </button>
    </div>
  );
};

export default AuctionNavigation;
