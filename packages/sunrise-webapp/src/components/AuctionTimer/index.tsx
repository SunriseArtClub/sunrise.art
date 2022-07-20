import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Auction } from '../../wrappers/sunriseAuction';
import classes from './AuctionTimer.module.css';
import { useState, useEffect, useRef } from 'react';

dayjs.extend(duration);

const AuctionTimer: React.FC<{
  auction: Auction;
  auctionEnded: boolean;
}> = props => {
  const { auction, auctionEnded } = props;

  const [auctionTimer, setAuctionTimer] = useState(0);
  const auctionTimerRef = useRef(auctionTimer); // to access within setTimeout
  auctionTimerRef.current = auctionTimer;

  const timerDuration = dayjs.duration(auctionTimerRef.current, 's');

  // Timer logic
  useEffect(() => {
    const timeLeft = (auction && Number(auction.endTime)) - dayjs().unix();

    setAuctionTimer(auction && timeLeft);

    if (auction && timeLeft <= 0) {
      setAuctionTimer(0);
    } else {
      const timer = setTimeout(() => {
        setAuctionTimer(auctionTimerRef.current - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auction, auctionTimer]);

  const auctionContent = auctionEnded ? 'Auction ended' : 'Auction ends';

  ('0' + 11).slice(-2);
  const daysToHours = (timerDuration.days() * 24);
  const flooredHours = ('0' + Math.floor(daysToHours + timerDuration.hours())).slice(-2);
  const flooredMinutes = ('0' + Math.floor(timerDuration.minutes())).slice(-2);
  const flooredSeconds = ('0' + Math.floor(timerDuration.seconds())).slice(-2);

  if (!auction) return null;

  return (
    <>
      <h4 className={classes.title}>{auctionContent}</h4>
      <h2 className={classes.timerWrapper}>
        <div className={classes.timerSection}>
          <span>
            {`${flooredHours}`}
            <span className={classes.small}>:</span>
          </span>
        </div>
        <div className={classes.timerSection}>
          <span>
            {`${flooredMinutes}`}
            <span className={classes.small}>:</span>
          </span>
        </div>
        <div className={classes.timerSection}>
          <span>
            {`${flooredSeconds}`}
            <span className={classes.small}></span>
          </span>
        </div>
      </h2>
    </>
  );
};

export default AuctionTimer;
