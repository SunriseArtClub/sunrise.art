import { useQuery } from '@apollo/client';
import React from 'react';
import { Image } from 'react-bootstrap';
import _LinkIcon from '../../assets/icons/Link.svg';
import { sunriseQuery } from '../../wrappers/subgraph';
import _HeartIcon from '../../assets/icons/Heart.svg';
import classes from './SunriseInfoRowHolder.module.css';

import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import ShortAddress from '../ShortAddress';

interface SunriseInfoRowHolderProps {
  sunriseId: number;
}

const SunriseInfoRowHolder: React.FC<SunriseInfoRowHolderProps> = props => {
  const { sunriseId } = props;

  const { loading, error, data } = useQuery(sunriseQuery(sunriseId.toString()));

  const etherscanURL = buildEtherscanAddressLink(data && data.sunrise.owner.id);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <div>Failed to fetch sunrise info</div>;
  }

  const shortAddressComponent = <ShortAddress address={data && data.sunrise.owner.id} />;

  return (
    <div className={classes.sunriseHolderInfoContainer}>
      <span>
        <Image src={_HeartIcon} className={classes.heartIcon} />
      </span>
      <span>Held by</span>
      <span>
        <a
          className={classes.sunriseHolderEtherscanLink}
          href={etherscanURL}
          target={'_blank'}
          rel="noreferrer"
        >
          {data.sunrise.owner.id.toLowerCase() ===
          config.addresses.sunriseAuctionHouseProxy.toLowerCase()
            ? 'Sunrises Auction House'
            : shortAddressComponent}
        </a>
      </span>
      <span className={classes.linkIconSpan}>
        <Image src={_LinkIcon} className={classes.linkIcon} />
      </span>
    </div>
  );
};

export default SunriseInfoRowHolder;
