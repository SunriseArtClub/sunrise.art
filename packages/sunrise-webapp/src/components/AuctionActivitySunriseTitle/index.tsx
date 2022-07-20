import { BigNumber } from 'ethers';
import classes from './AuctionActivitySunriseTitle.module.css';

const AuctionActivitySunriseTitle: React.FC<{ sunriseId: BigNumber }> = props => {
  const { sunriseId } = props;
  const sunriseIdContent = `Sunrise ${sunriseId.toString()}`;
  return (
    <div className={classes.wrapper}>
      <h1>{sunriseIdContent}</h1>
    </div>
  );
};
export default AuctionActivitySunriseTitle;
