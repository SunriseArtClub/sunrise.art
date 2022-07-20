import { useReverseENSLookUp } from '../../utils/ensLookup';
import classes from './ShortAddress.module.css';

const ShortAddress: React.FC<{ address: string; avatar?: boolean; small?: boolean }> = props => {
  let { address, avatar, small } = props;

  address = address || '0x0000000000000000000000000000000000000000';
  const ens = useReverseENSLookUp(address);
  const shortAddress = address && [address.substr(0, 4), address.substr(38, 4)].join('...');

  if (avatar) {
    return (
      <div
        className={`${small ? classes.shortAddressSmall : ''} ${classes.shortAddress}`}
        title={ens ? ens : shortAddress}
      >
        {ens ? ens : shortAddress}
      </div>
    );
  }

  return <>{ens ? ens : shortAddress}</>;
};

export default ShortAddress;
