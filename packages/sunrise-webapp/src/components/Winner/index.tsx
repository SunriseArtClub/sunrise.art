import classes from './Winner.module.css';
import ShortAddress from '../ShortAddress';

const Winner: React.FC<{ winner: string }> = props => {
  const { winner } = props;

  return (
    <div className={classes.section}>
      <h4>Winner</h4>
      <h2>
        <ShortAddress address={winner} avatar={true} />
      </h2>
    </div>
  );
};

export default Winner;
