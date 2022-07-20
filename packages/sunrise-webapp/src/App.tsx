import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useAppDispatch, useAppSelector } from './hooks';
import { setActiveAccount } from './state/slices/account';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { setAlertModal } from './state/slices/application';
import './css/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertModal from './components/Modal';
import NetworkAlert from './components/NetworkAlert';
import AuctionPage from './pages/Auction';
import NotFoundPage from './pages/NotFound';
import { CHAIN_ID } from './config';

function App() {
  const { account, chainId } = useEthers();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveAccount(account));
  }, [account, dispatch]);

  const alertModal = useAppSelector(state => state.application.alertModal);

  return (
    <>
      {Number(CHAIN_ID) !== chainId && <NetworkAlert />}
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={AuctionPage} />
          <Route
            exact
            path="/sunrise/:id"
            render={props => <AuctionPage initialAuctionId={Number(props.match.params.id)} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;