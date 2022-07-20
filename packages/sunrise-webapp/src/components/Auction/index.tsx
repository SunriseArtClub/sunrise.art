import StandaloneSunrise from '../StandaloneSunrise';
import SunriseSunContent from '../SunriseSunContent';
import AuctionActivity from '../AuctionActivity';
import { Row, Container, Col } from 'react-bootstrap';
import { LoadingSunrise } from '../Sunrise';
import { Auction as IAuction } from '../../wrappers/sunriseAuction';
import classes from './Auction.module.css';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  setNextOnDisplayAuctionSunriseId,
  setPrevOnDisplayAuctionSunriseId,
} from '../../state/slices/onDisplayAuction';
import { isSunriseSun } from '../../utils/sunriseSun';
import { BigNumber } from '@ethersproject/bignumber';

interface AuctionProps {
  auction?: IAuction;
  properties: any;
}

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction, properties } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const lastSunriseId = useAppSelector(state => state.onDisplayAuction.lastAuctionSunriseId);

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionSunriseId());
    currentAuction && history.push(`/sunrise/${currentAuction.sunriseId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionSunriseId());
    currentAuction && history.push(`/sunrise/${(currentAuction.sunriseId).toNumber() + 1}`);
  };

  const sunriseContent = currentAuction && (
    <div className={classes.sunriseWrapper}>
      <StandaloneSunrise sunriseId={currentAuction.sunriseId} />
    </div>
  );

  const loadingSunrise = (
    <div className={classes.sunriseWrapper}>
      <LoadingSunrise />
    </div>
  );

  const sunriseSunContent = properties && currentAuction && lastSunriseId && (
    <SunriseSunContent
      auction={currentAuction}
      title={properties.name}
      isFirstAuction={currentAuction.sunriseId.lt(49)}
      isLastAuction={currentAuction.sunriseId.eq(lastSunriseId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
    />
  );

  const currentAuctionActivityContent = currentAuction && lastSunriseId && (
    <AuctionActivity
      auction={currentAuction}
      title={properties.name}
      isFirstAuction={currentAuction.sunriseId.lt(49)}
      isLastAuction={currentAuction.sunriseId.eq(lastSunriseId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
      displayGraphDepComps={true}
    />
  );

  return (
    <div>
      <Container fluid="lg">
        <Row>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
            {currentAuction ? sunriseContent : loadingSunrise}
          </Col>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
            {currentAuction && isSunriseSun(BigNumber.from(currentAuction.sunriseId))
              ? sunriseSunContent
              : currentAuctionActivityContent}
            {properties.attributes && properties.attributes.length > 0 && (
              <Col lg={{ span: 12 }} className={classes.auctionProperties}>
                <ul className={classes.propertiesList}>
                  <li>
                    <img
                      className={classes.propertiesIcon}
                      src={
                        `/static/icons/Cloud/` +
                        `${properties.attributes[4].value}`.toUpperCase() +
                        '.png'
                      }
                      alt={properties?.attributes[4].value}
                    />
                    <span>
                      Cloud{' '}
                      <strong className={classes.propertiesItem}>
                        {properties?.attributes[4].value}
                      </strong>
                    </span>
                  </li>
                  <li>
                    <img
                      className={classes.propertiesIcon}
                      src={
                        `/static/icons/Weather/` +
                        `${properties.attributes[5].value}`.toUpperCase() +
                        '.png'
                      }
                      alt={properties.attributes[5].value}
                    />
                    <span>
                      Weather
                      <strong className={classes.propertiesItem}>
                        {properties.attributes[5].value}
                      </strong>
                    </span>
                  </li>
                  <li>
                    <img
                      className={classes.propertiesIcon}
                      src={
                        `/static/icons/Season/` +
                        `${properties.attributes[6].value}`.toUpperCase() +
                        '.png'
                      }
                      alt={properties.attributes[6].value}
                    />
                    <span>
                      Season
                      <strong className={classes.propertiesItem}>
                        {properties.attributes[6].value}
                      </strong>
                    </span>
                  </li>
                  <li>
                    <img
                      className={classes.propertiesIcon}
                      src={
                        `/static/icons/Silhouette/` +
                        `${properties.attributes[7].value}`.toUpperCase() +
                        '.png'
                      }
                      alt={properties.attributes[7].value}
                    />
                    <span>
                      Silhouette<strong>{properties.attributes[7].value}</strong>
                    </span>
                  </li>
                  {properties.attributes[8].value.length > 0 && (
                    <li>
                      <img
                        className={classes.propertiesIcon}
                        src={`/static/icons/Object/OBJECT_1.png`}
                        alt={properties.attributes[8].value}
                      />
                      <span>
                        Object 1
                        <strong className={classes.propertiesItem}>
                          {properties.attributes[8].value}
                        </strong>
                      </span>
                    </li>
                  )}
                  {properties.attributes[9].value.length > 0 && (
                    <li>
                      <img
                        className={classes.propertiesIcon}
                        src={`/static/icons/Object/OBJECT_2.png`}
                        alt={properties.attributes[9].value}
                      />
                      <span>
                        Object 2
                        <strong className={classes.propertiesItem}>
                          {properties.attributes[9].value}
                        </strong>
                      </span>
                    </li>
                  )}
                </ul>
              </Col>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auction;
