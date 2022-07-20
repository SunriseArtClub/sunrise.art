import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';

import classes from './Fundnstream.module.css';

const Fundnstream = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const isMobile = window.innerWidth < 900;

  const ref = useRef(null);
  const isVisible = onScreen(ref, { threshold: isMobile ? 0.3 : 1 });

  useEffect(() => {
    if (isVisible) setShowAnimation(true);
  }, [isVisible]);

  return (
    <div className={classes.Fundnstream}>
      <div className={classes.titleWrapper}>
        <h1>What's Fundnstream</h1>
      </div>
      <div
        ref={ref}
        className={`${classes.timelineContainer} ${showAnimation ? classes.timelineAnimation : ''}`}
      >
        <div className={classes.quarter}>
          <div>
            <p>NFT Sale</p>
            <p>Token Sale</p>
            <p>Bonding &amp; Staking Launch</p>
          </div>
          <div>
            <h3>Q4</h3>
            <h2>2021</h2>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <h3>Q1</h3>
            <h2>2022</h2>
          </div>
          <div>
            <p>PRC Token Launch</p>
            <p>Supply Chain Investments</p>
            <p>First PRC's Minted</p>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <p>PRC Partner Expansion</p>
          </div>
          <div>
            <h3>Q2</h3>
            <h2>2022</h2>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <h3>Q3</h3>
            <h2>2022</h2>
          </div>
          <div>
            <p>Corporate Partnerships</p>
            <p>New Asset Class Dev</p>
          </div>
        </div>
        <div className={classes.quarter}>
          <div>
            <p>New Asset Launch</p>
          </div>
          <div>
            {/* <h3>Q4</h3>
            <h2>2022</h2> */}
          </div>
        </div>
        <div className={classes.quarter}>
          <div></div>
          <div>
            <h3>Beyond</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fundnstream;
