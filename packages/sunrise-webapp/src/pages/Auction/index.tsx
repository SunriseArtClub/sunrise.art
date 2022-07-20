import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionSunriseId, setPrevOnDisplayAuctionSunriseId } from '../../state/slices/onDisplayAuction';
import { push } from 'connected-react-router';
import { sunrisePath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect, useState } from 'react';
import classes from './Auction.module.css';
// import InfoSections from '../../components/InfoSections';
import Auction from '../../components/Auction';
import SunriseInfo from '../../components/SunriseInfo';
import loadingSunrise from '../../assets/placeholder.jpg';
import { IPFS_HASH } from '../../config';
import { ISunriseToken } from '../../wrappers/sunriseToken';
import { generatePinataRestUrl } from '../../utils/ipfs';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';


interface AuctionPageProps {
  initialAuctionId: number;
}

const AuctionPage: React.FC<AuctionPageProps> = props => {
  const { initialAuctionId } = props;
  const onDisplayAuction = useOnDisplayAuction();
  const lastAuctionSunriseId = useAppSelector(state => state.onDisplayAuction.lastAuctionSunriseId);

  const dispatch = useAppDispatch();

   const initialSunriseState = {
    description: '',
    image: '',
    name: '',
    attributes: [],
  };

  const sunriseId = onDisplayAuction && onDisplayAuction.sunriseId.toNumber();
  const sunriseURI = `${IPFS_HASH}/${sunriseId}`;
  const [properties, setProperties] = useState<ISunriseToken>(initialSunriseState);

  const getSunrise = async (sunriseURI: string) => {
    const sunriseTokenData = await axios.get<ISunriseToken>(generatePinataRestUrl(sunriseURI));

    const sunriseImageData = await axios.get(generatePinataRestUrl(sunriseTokenData.data.image), {
      responseType: 'arraybuffer',
    });

    const sunriseImageBase64 = Buffer.from(sunriseImageData.data, 'binary').toString('base64');

    setProperties({
      ...sunriseTokenData.data,
      image: `data:image/png;base64, ${sunriseImageBase64}`,
    });
  };

  useEffect(() => {
    if (!lastAuctionSunriseId) return;

    if (initialAuctionId !== undefined) {
      // Handle out of bounds Sunrise path ids
      if (initialAuctionId > lastAuctionSunriseId || initialAuctionId < 0) {
        // Handle 10th Sunrise
        const auctionDuration = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);
        if (lastAuctionSunriseId % 10 === 1 && onDisplayAuction && onDisplayAuction.endTime.toNumber() > auctionDuration) {
          dispatch(setPrevOnDisplayAuctionSunriseId()); 
        } else {
          dispatch(setOnDisplayAuctionSunriseId(lastAuctionSunriseId));
          dispatch(push(sunrisePath(lastAuctionSunriseId)));
        }
      } else {
        if (onDisplayAuction === undefined) {
          // Handle regular Sunrise path ids on first load
          dispatch(setOnDisplayAuctionSunriseId(initialAuctionId));
        }
      }
    } else {
      // Handle no Sunrise path id set
      if (lastAuctionSunriseId) {
        dispatch(setOnDisplayAuctionSunriseId(lastAuctionSunriseId));
      }
    }
    // eslint-disable-next-line
  }, [lastAuctionSunriseId, dispatch, initialAuctionId, onDisplayAuction]);

  useEffect(() => {
    if (sunriseURI) {
      getSunrise(sunriseURI)
    }
  }, [sunriseURI]);

  const imgPath = properties && properties?.image;

return (
  <div className={`${classes.wrapper}`}>
    <img
      className={classes.wrapperBg}
      src={imgPath ? imgPath : loadingSunrise}
      alt={properties.name}
    />
    <NavBar />
    <Auction auction={onDisplayAuction} properties={properties} />
    <SunriseInfo />
    <Footer />
  </div>
);
};
export default AuctionPage;
