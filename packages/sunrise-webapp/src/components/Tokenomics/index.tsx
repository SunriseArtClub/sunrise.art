import { useEffect, useState, useRef } from 'react';
import onScreen from '../../hooks/onScreen';
import logo from './assets/sunriseLogo.svg';
import coin from './assets/coin.png';
import usdToken from './assets/usdToken.png';
import polygonToken from './assets/polygonToken.png';
import bonding from './assets/bonding.svg';
import removal from './assets/removal.svg';
import verified from './assets/verified.svg';
import prc from './assets/prc.png';
import prcLogo from './assets/prcLogo.svg';
import purchase from './assets/purchase.svg';
import arrowLong from './assets/arrowLong.svg';
import arrowShort from './assets/arrowShort.svg';
import line from './assets/line.svg';
import ocean from './assets/ocean.png';

import classes from './Tokenomics.module.css';

const Tokenomics = () => {
  const [currentSectionVisible, setCurrentSectionVisible] = useState(0);

  const isMobile = window.innerWidth < 900;

  const sectionOneRef = useRef(null);
  const isSectionOneVisible = onScreen(sectionOneRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionTwoRef = useRef(null);
  const isSectionTwoVisible = onScreen(sectionTwoRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionThreeRef = useRef(null);
  const isSectionThreeVisible = onScreen(sectionThreeRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionFourRef = useRef(null);
  const isSectionFourVisible = onScreen(sectionFourRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const sectionFiveRef = useRef(null);
  const isSectionFiveVisible = onScreen(sectionFiveRef, {
    threshold: isMobile ? 1 : 0.5,
  });

  const desktopCentralImg = useRef(null);
  const isDesktopVisible = onScreen(desktopCentralImg, {
    threshold: 1,
    rootMargin: '-100px',
  });

  useEffect(() => {
    if (isSectionOneVisible && currentSectionVisible < 1) setCurrentSectionVisible(1);
    if (isSectionTwoVisible && currentSectionVisible < 2) setCurrentSectionVisible(2);
    if (isSectionThreeVisible && currentSectionVisible < 3) setCurrentSectionVisible(3);
    if (isSectionFourVisible && currentSectionVisible < 4) setCurrentSectionVisible(4);
    if (isSectionFiveVisible && currentSectionVisible < 5) setCurrentSectionVisible(5);

    if (isDesktopVisible) setCurrentSectionVisible(6);
  }, [
    isSectionOneVisible,
    isSectionTwoVisible,
    isSectionThreeVisible,
    isSectionFourVisible,
    isSectionFiveVisible,
    isDesktopVisible,
    currentSectionVisible,
  ]);

  return (
    <>
      <div
        id="Tokenomics"
        className={`${classes.section} ${currentSectionVisible >= 6 ? classes.contentFadeIn : ''}`}
        // className={classes.section}
      >
        <h1>Tokenomics</h1>
        <img ref={desktopCentralImg} className={classes.centralImg} src={logo} alt="Logo" />
        <h4 className={classes.sunriseHeadline}>SunriseFund</h4>
        <div
          ref={sectionOneRef}
          className={`${classes.sectionOne} ${
            currentSectionVisible >= 1 && isMobile ? classes.contentFadeIn : ''
          }`}
        >
          <img className={classes.desktopImg} src={bonding} alt="Bonding" />
          <div className={classes.exchangeImages}>
            <img src={bonding} alt="Bonding" />
            <div className={classes.exchangeCoins}>
              <img src={polygonToken} alt="Coin" />
              <div>
                <img src={coin} alt="Coin" />
                <div className={classes.wind} />
              </div>
            </div>
            <img src={logo} alt="Bonding" />
          </div>
          <h2>01 Bonding</h2>
          <p>
            Members of the Fund buy DIAT at a discount in exchange for tokens that build the
            treasury.
          </p>
        </div>
        <div
          ref={sectionTwoRef}
          className={`${classes.sectionTwo} ${
            currentSectionVisible >= 2 && isMobile ? classes.contentFadeIn : ''
          }`}
        >
          <img src={removal} alt="Removal Boat" />
          <h2>02 Removal Projects Funded</h2>
          <p>We distribute funds to PRC-compliant projects.</p>
        </div>
        <div
          ref={sectionThreeRef}
          className={`${classes.sectionThree} ${
            currentSectionVisible >= 3 && isMobile ? classes.contentFadeIn : ''
          }`}
        >
          <img src={verified} alt="Verify Icon" />
          <h2>03 Plastic Removal Verified</h2>
          <p>The plastic is removed, weighed, and transparently processed.</p>
        </div>
        <div
          ref={sectionFourRef}
          className={`${classes.sectionFour} ${
            currentSectionVisible >= 4 && isMobile ? classes.contentFadeIn : ''
          }`}
        >
          <img className={classes.mobileImg} src={prc} alt="Plastic" />
          <img className={classes.desktopImg} src={prcLogo} alt="PRC" />
          <h2>04 PRC Minted</h2>
          <p>
            Depending on the value of the plastic removed, a number of PRC's are minted and put into
            our treasury as assets.
          </p>
        </div>
        <div
          ref={sectionFiveRef}
          className={`${classes.sectionFive} ${
            currentSectionVisible >= 5 && isMobile ? classes.contentFadeIn : ''
          }`}
        >
          <img className={classes.mobileImg} src={purchase} alt="Institution" />
          <img className={classes.desktopImg} src={purchase} alt="Institution" />
          <h2>05 PRC Purchases</h2>
          <p>
            Corporations and individuals buy PRC's and "retire" them to provably remove plastic
            pollution.
          </p>
        </div>

        <img className={classes.lineSectionOne} src={line} alt="Line" />
        <img className={classes.lineSectionFive} src={line} alt="Line" />

        <img className={classes.arrowSectionTwo} src={arrowLong} alt="Long arrow" />
        <img className={classes.arrowSectionFour} src={arrowLong} alt="Long arrow" />

        <img className={classes.shortArrowOne} src={arrowShort} alt="Short arrow" />
        <img className={classes.shortArrowTwo} src={arrowShort} alt="Short arrow" />

        <div className={classes.coinsContainer}>
          <div className={classes.coinsSectionOne}>
            <div>
              <img src={coin} alt="Coin" />
              <div className={classes.wind} />
            </div>
            <div>
              <img src={polygonToken} alt="Coin" />
            </div>
          </div>
          <div className={classes.coinsSectionTwo}>
            <div>
              <img src={usdToken} alt="Coin" />
            </div>
          </div>
          <div className={classes.coinsSectionThree}>
            <div>
              <img src={prc} alt="Coin" />
              <div className={classes.wind} />
            </div>
          </div>
          <div className={classes.coinsSectionFour}>
            <div>
              <img src={usdToken} alt="Coin" />
            </div>
            <div>
              <img src={prc} alt="Coin" />
              <div className={classes.wind} />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.oceanWrapper}>
        <img className={classes.ocean} src={ocean} alt={'Ocean'} />
      </div>
    </>
  );
};

export default Tokenomics;
