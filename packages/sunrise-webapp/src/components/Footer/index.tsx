import classes from './Footer.module.css';
import { externalURL, ExternalURL } from '../../utils/externalURL';
import facebook from '../../assets/social/Facebook.svg';
import twitter from '../../assets/social/Twitter.svg';
import discord from '../../assets/social/Discord.svg';
import instagram from '../../assets/social/Instagram.svg';

const Footer = () => {
  const twitterURL = externalURL(ExternalURL.twitter);
  const discordURL = externalURL(ExternalURL.discord);
  const instagramURL = externalURL(ExternalURL.instagram);
  const facebookURL = externalURL(ExternalURL.facebook);
  const fundURL = externalURL(ExternalURL.fund);
  const openseaURL = externalURL(ExternalURL.opensea);
  const snapshotURL = externalURL(ExternalURL.snapshot);
  const contractsURL = externalURL(ExternalURL.contracts);

  return (
    <footer id="community" className={classes.footerSignature}>
      <ul className={classes.additionalLinks}>
        <li>
          <a href={fundURL} target="_blank" rel="noreferrer">
            Fund
          </a>
        </li>
        <li>
          <a href={openseaURL} target="_blank" rel="noreferrer">
            OpenSea
          </a>
        </li>
        <li>
          <a href={snapshotURL} target="_blank" rel="noreferrer">
            Snapshot
          </a>
        </li>
        <li>
          <a href={contractsURL} target="_blank" rel="noreferrer">
            Contracts
          </a>
        </li>
      </ul>
      <ul className={classes.additionalLinks}>
        <li>
          <a href={discordURL} target="_blank" rel="noreferrer">
            <img src={discord} alt="Discord" />
          </a>
        </li>
        <li>
          <a href={twitterURL} target="_blank" rel="noreferrer">
            <img src={twitter} alt="Twitter" />
          </a>
        </li>
        <li>
          <a href={instagramURL} target="_blank" rel="noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
        </li>
        <li>
          <a href={facebookURL} target="_blank" rel="noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
        </li>
      </ul>
      <div className={classes.copyright}>
        <h5>Sunrise Art Club</h5>
        <p>&copy; Copyright {new Date().getFullYear()}, Sunrise Art Club. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
