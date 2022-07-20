import { Auction } from '../../wrappers/sunriseAuction';
import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { Row, Col } from 'react-bootstrap';
import classes from './AuctionActivity.module.css';
import bidHistoryClasses from './BidHistory.module.css';
import Bid from '../Bid';
import AuctionTimer from '../AuctionTimer';
import CurrentBid from '../CurrentBid';
import Winner from '../Winner';
import BidHistory from '../BidHistory';
import { Modal } from 'react-bootstrap';
import AuctionNavigation from '../AuctionNavigation';
import AuctionActivityWrapper from '../AuctionActivityWrapper';
// import BidHistoryBtn from '../BidHistoryBtn';
// import config from '../../config';
// import { buildEtherscanAddressLink } from '../../utils/etherscan';

// const openEtherscanBidHistory = () => {
//   const url = buildEtherscanAddressLink(config.addresses.sunriseAuctionHouseProxy);
//   window.open(url);
// };

interface AuctionActivityProps {
  auction: Auction;
  title: string;
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
  displayGraphDepComps: boolean;
}

const AuctionActivity: React.FC<AuctionActivityProps> = (props: AuctionActivityProps) => {
  const {
    auction,
    title,
    isFirstAuction,
    isLastAuction,
    onPrevAuctionClick,
    onNextAuctionClick,
    displayGraphDepComps,
  } = props;

  const [auctionEnded, setAuctionEnded] = useState(false);
  const [auctionTimer, setAuctionTimer] = useState(false);

  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  // const showBidModalHandler = () => {
  //   setShowBidHistoryModal(true);
  // };
  const dismissBidModalHanlder = () => {
    setShowBidHistoryModal(false);
  };

  const bidHistoryTitle = <h1>Bid History</h1>;

  // timer logic - check auction status every 30 seconds, until five minutes remain, then check status every second
  useEffect(() => {
    if (!auction) return;

    const timeLeft = Number(auction.endTime) - Math.floor(Date.now() / 1000);

    if (auction && timeLeft <= 0) {
      setAuctionEnded(true);
    } else {
      setAuctionEnded(false);
      const timer = setTimeout(
        () => {
          setAuctionTimer(!auctionTimer);
        },
        timeLeft > 300 ? 30000 : 1000,
      );

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auctionTimer, auction]);

  if (!auction) return null;

  return (
    <>
      {showBidHistoryModal && (
        <Modal
          show={showBidHistoryModal}
          onHide={dismissBidModalHanlder}
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton className={classes.modalHeader}>
            {/* <div className={classes.modalHeaderSunriseImgWrapper}>
              <StandaloneSunrise sunriseId={auction && auction.sunriseId} noDescription />
            </div> */}
            <Modal.Title className={classes.modalTitleWrapper}>{bidHistoryTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BidHistory auctionId={auction.sunriseId.toString()} max={9999} />
          </Modal.Body>
        </Modal>
      )}

      <AuctionActivityWrapper>
        <div className={classes.informationRow}>
          <Row className={classes.activityRow}>
            <AuctionNavigation
              auction={auction}
              title={title}
              isFirstAuction={isFirstAuction}
              isLastAuction={isLastAuction}
              onNextAuctionClick={onNextAuctionClick}
              onPrevAuctionClick={onPrevAuctionClick}
            />
            <Col lg={4} className={classes.currentBidCol}>
              <CurrentBid
                currentBid={new BigNumber(auction.amount.toString())}
                auctionEnded={auctionEnded}
              />
            </Col>
            <Col lg={8} className={classes.auctionTimerCol}>
              {auctionEnded ? (
                <Winner winner={auction.bidder} />
              ) : (
                <AuctionTimer auction={auction} auctionEnded={auctionEnded} />
              )}
            </Col>
          </Row>
        </div>
        {isLastAuction && (
          <Row className={classes.activityRow}>
            <Col lg={12}>
              <Bid auction={auction} auctionEnded={auctionEnded} />
            </Col>
          </Row>
        )}
        <Row className={classes.activityRow}>
          <Col lg={12}>
            {displayGraphDepComps && (
              <BidHistory
                auctionId={auction.sunriseId.toString()}
                max={3}
                classes={bidHistoryClasses}
              />
            )}
            {/* If no bids, show nothing. If bids avail:graph is stable? show bid history modal,
            else show etherscan contract link */}
            {/* {!auction.amount.eq(0) &&
              (displayGraphDepComps ? (
                <BidHistoryBtn onClick={showBidModalHandler} />
              ) : (
                <BidHistoryBtn onClick={openEtherscanBidHistory} />
              ))} */}
          </Col>
        </Row>
      </AuctionActivityWrapper>
    </>
  );
};

export default AuctionActivity;