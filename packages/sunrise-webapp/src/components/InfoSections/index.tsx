import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';

import treasure from './assets/treasure.png';
import coinsStack from './assets/coinsStack.png';
import staking from './assets/staking.png';
import sunrises from './assets/sunrises.svg';

import classes from './InfoSections.module.css';

const InfoSections = () => {
  const [showSectionOne, setShowSectionOne] = useState(false);
  const [showSectionTwo, setShowSectionTwo] = useState(false);
  const [showSectionThree, setShowSectionThree] = useState(false);
  const [showSectionFour, setShowSectionFour] = useState(false);

  const isMobile = window.innerWidth < 900;

  const sectionOneRef = useRef(null);
  const isSectionOneVisible = onScreen(sectionOneRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  const sectionTwoRef = useRef(null);
  const isSectionTwoVisible = onScreen(sectionTwoRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  const sectionThreeRef = useRef(null);
  const isSectionThreeVisible = onScreen(sectionThreeRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  const sectionFourRef = useRef(null);
  const isSectionFourVisible = onScreen(sectionFourRef, {
    threshold: 0.5,
    rootMargin: isMobile ? '0px' : '-200px',
  });

  useEffect(() => {
    if (isSectionOneVisible) setShowSectionOne(true);
    if (isSectionTwoVisible) setShowSectionTwo(true);
    if (isSectionThreeVisible) setShowSectionThree(true);
    if (isSectionFourVisible) setShowSectionFour(true);
  }, [isSectionOneVisible, isSectionTwoVisible, isSectionThreeVisible, isSectionFourVisible]);

  return (
    <div id="works" className={classes.infoSections}>
      <h1>How it works</h1>
      <div
        ref={sectionOneRef}
        className={`${classes.sectionLeft} ${showSectionOne ? classes.fadeIn : ''}`}
      >
        <div>
          <div className={classes.sectionTitle}>
            <p>01</p>
            <h2>The Treasury</h2>
          </div>
          <p>
            We sell bonds of discounted DIAT for ETH, DAI and other tokens in order to build up our
            Fund treasury. The treasury is used to back DIAT with intrinsic value (like how gold
            used to back the Dollar).
          </p>
        </div>
        <div>
          <img className={classes.tresuasuryMobileMargin} src={treasure} alt="treasure DIAT" />
        </div>
      </div>
      <div
        ref={sectionTwoRef}
        className={`${classes.sectionRight} ${showSectionTwo ? classes.fadeIn : ''}`}
      >
        <div>
          <img className={classes.coinsStack} src={coinsStack} alt="DIAT backed" />
        </div>
        <div>
          <div className={classes.sectionTitle}>
            <p>02</p>
            <h2>LP Fees</h2>
          </div>
          <p>
            Having a large treasury allows us to provide and own 99%+ of our liquidity pools (LP's)
            on exchanges. That means every single trade of DIAT pays liquidity fees back to our
            treasury.
          </p>
        </div>
      </div>
      <div
        ref={sectionThreeRef}
        className={`${classes.sectionLeft} ${showSectionThree ? classes.fadeIn : ''}`}
      >
        <div>
          <div className={classes.sectionTitle}>
            <p>03</p>
            <h2>Staking</h2>
          </div>
          <p>
            All DIAT holders can 'stake' their tokens for 3X daily compounding yield. This is good
            for holders, since they get an incredible interest rate for holding, and it's good for
            the Fund, since fewer people selling equates to increased DIAT value.
          </p>
        </div>
        <div>
          <img src={staking} alt="Staking DIAT" />
        </div>
      </div>
      <div
        ref={sectionFourRef}
        className={`${classes.sectionRight} ${showSectionFour ? classes.fadeIn : ''}`}
      >
        <div>
          <img src={sunrises} alt="Sunrises protection" />
        </div>
        <div>
          <div className={classes.sectionTitle}>
            <p>04</p>
            <h2>Ocean Protection</h2>
          </div>
          <p>
            Unlike many other Fund's, we have a mission: to protect the ocean! We're using treasury
            funds to invest in highly-vetted ocean protection &amp; cleanup projects. Some will be
            donations, and others will be high-yield investments that also serve to build up our
            treasury value.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSections;
