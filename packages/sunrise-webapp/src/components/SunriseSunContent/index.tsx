import { Col, Row } from 'react-bootstrap';
import AuctionActivityWrapper from '../AuctionActivityWrapper';
import AuctionNavigation from '../AuctionNavigation';
import sunriseContentClasses from './SunriseSunContent.module.css';
import auctionBidClasses from '../AuctionActivity/BidHistory.module.css';
import bidBtnClasses from '../BidHistoryBtn//BidHistoryBtn.module.css';
import auctionActivityClasses from '../AuctionActivity/AuctionActivity.module.css';
import CurrentBid, { BID_N_A } from '../CurrentBid';

const SunriseSunContent: React.FC<{
  auction: any;
  title: string;
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
}> = props => {
  const { auction, title, isFirstAuction, isLastAuction, onPrevAuctionClick, onNextAuctionClick } =
    props;

  return (
    <AuctionActivityWrapper>
      <div className={auctionActivityClasses.informationRow}>
        <Row className={auctionActivityClasses.activityRow}>
          <Col lg={12} className={auctionActivityClasses.colAlignCenter}>
            <AuctionNavigation
              auction={auction}
              title={title}
              isFirstAuction={isFirstAuction}
              isLastAuction={isLastAuction}
              onNextAuctionClick={onNextAuctionClick}
              onPrevAuctionClick={onPrevAuctionClick}
            />
          </Col>
        </Row>
        <Row className={auctionActivityClasses.activityRow}>
          <Col lg={4} className={auctionActivityClasses.currentBidCol}>
            <CurrentBid currentBid={BID_N_A} auctionEnded={true} />
          </Col>
          <Col
            lg={6}
            className={`${auctionActivityClasses.currentBidCol} ${sunriseContentClasses.currentBidCol}`}
          >
            <div className={auctionActivityClasses.section}>
              <h4>Winner</h4>
              <h3>sunrisefund.eth</h3>
            </div>
          </Col>
        </Row>
      </div>
      <Row className={auctionActivityClasses.activityRow}>
        <Col lg={12}>
          <ul className={auctionBidClasses.bidCollection}>
            <li className={`${auctionBidClasses.bidRow} ${sunriseContentClasses.bidRow}`}>
              Every 10th Sunrise of the project will be sent to our multi-sig wallet, where it will
              be vested and distributed to our core team and community through giveaways and
              contests.
            </li>
          </ul>
          <div className={bidBtnClasses.bidHistoryWrapper}>
            <a
              href="https://sunriseart.notion.site/Drop-Details-0e69f53b45b34c68a78be1569c28b31c"
              className={bidBtnClasses.bidHistory}
              target="_blank"
              rel="noreferrer"
            >
              Learn More →
            </a>
          </div>
        </Col>
      </Row>
    </AuctionActivityWrapper>
  );
};
export default SunriseSunContent;
