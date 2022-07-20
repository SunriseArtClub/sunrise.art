import { useAppSelector } from '../../hooks';
import ShortAddress from '../ShortAddress';
import classes from './NavBar.module.css';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { useEtherBalance, useEthers } from '@usedapp/core';
import WalletConnectModal from '../WalletConnectModal';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import clsx from 'clsx';
import { utils } from 'ethers';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import { ExternalURL, externalURL } from '../../utils/externalURL';

const NavBar = () => {
  const activeAccount = useAppSelector(state => state.account?.activeAccount);
  const { deactivate } = useEthers();

  const treasuryBalance = useEtherBalance('0x2EfDC5AEC299BF959cb0f0D8fF42268686731614');
  const fundEtherscanLink = buildEtherscanAddressLink('0x2EfDC5AEC299BF959cb0f0D8fF42268686731614');

  const [showConnectModal, setShowConnectModal] = useState(false);

  const showModalHandler = () => {
    setShowConnectModal(true);
  };
  const hideModalHandler = () => {
    setShowConnectModal(false);
  };

  const connectedContent = (
    <>
      <Nav.Item>
        <Nav.Link className={clsx(classes.sunrisesNavLink, classes.addressNavLink)} disabled>
          <span className={classes.greenStatusCircle} />
          <span>{activeAccount && <ShortAddress address={activeAccount} avatar={true} />}</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={clsx(classes.sunrisesNavLink, classes.disconnectBtn)}
          onClick={() => {
            setShowConnectModal(false);
            deactivate();
            setShowConnectModal(false);
          }}
        >
          Disconnect
        </Nav.Link>
      </Nav.Item>
    </>
  );

  const disconnectedContent = (
    <>
      <Nav.Link
        className={clsx(classes.sunrisesNavLink, classes.connectBtn)}
        onClick={showModalHandler}
      >
        Connect Wallet
      </Nav.Link>
    </>
  );

  return (
    <>
      {showConnectModal && activeAccount === undefined && (
        <WalletConnectModal onDismiss={hideModalHandler} />
      )}
      <Navbar expand="lg" variant="dark">
        <Container className={classes.navWrapper}>
          <Navbar.Brand as={Link} to="/" className={classes.navBarBrand}>
            <img src={logo} alt="Sunrise Art Club" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className={classes.navToggle} />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Item>
              {treasuryBalance && (
                <Nav.Link
                  href={fundEtherscanLink}
                  className={classes.sunrisesNavLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  FUND Ξ{Number(utils.formatEther(treasuryBalance)).toFixed(2)}
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Link
              href={externalURL(ExternalURL.notion)}
              className={classes.sunrisesNavLink}
              target="_blank"
              rel="noreferrer"
            >
              Info
            </Nav.Link>
            {activeAccount ? connectedContent : disconnectedContent}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
