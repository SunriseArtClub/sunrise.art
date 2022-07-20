import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import account from './state/slices/account';
import application from './state/slices/application';
import logs from './state/slices/logs';
import auction, {
  reduxSafeAuction,
  reduxSafeNewAuction,
  reduxSafeBid,
  setActiveAuction,
  setAuctionExtended,
  setAuctionSettled,
  setFullAuction,
} from './state/slices/auction';
import onDisplayAuction, {
  setLastAuctionSunriseId,
  setOnDisplayAuctionSunriseId,
} from './state/slices/onDisplayAuction';
import { ApolloProvider, useQuery } from '@apollo/client';
import { clientFactory, latestAuctionsQuery } from './wrappers/subgraph';
import { useEffect } from 'react';
import pastAuctions, { addPastAuctions } from './state/slices/pastAuctions';
import LogsUpdater from './state/updaters/logs';
import config, { CHAIN_ID, createNetworkHttpUrl } from './config';
import { WebSocketProvider } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from 'ethers';
import { SunriseAuctionHouseFactory } from '@sunrise/sdk';
import dotenv from 'dotenv';
import { useAppDispatch } from './hooks';
import { appendBid } from './state/slices/auction';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, createStore, combineReducers, PreloadedState } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { sunrisePath } from './utils/history';
import { push } from 'connected-react-router';
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const datoClient = new GraphQLClient({
  url: "https://graphql.datocms.com/",
  headers: {
    "Authorization": `Bearer ${process.env.REACT_APP_DATO_CMS_API_KEY}`,
  }
});


dotenv.config();

export const history = createBrowserHistory();

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    account,
    application,
    auction,
    logs,
    pastAuctions,
    onDisplayAuction,
  });

export default function configureStore(preloadedState: PreloadedState<any>) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  );

  return store;
}

const store = configureStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// prettier-ignore
const useDappConfig = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    [ChainId.Rinkeby]: createNetworkHttpUrl('rinkeby'),
    [ChainId.Mainnet]: createNetworkHttpUrl('mainnet'),
    [ChainId.Hardhat]: 'http://localhost:8545',
  },
};

const client = clientFactory(config.app.subgraphApiUri);

const Updaters = () => {
  return (
    <>
      <LogsUpdater />
    </>
  );
};

const BLOCKS_PER_DAY = 6_500;

const ChainSubscriber: React.FC = () => {
  const dispatch = useAppDispatch();

  const loadState = async () => {
    const wsProvider = new WebSocketProvider(config.app.wsRpcUri);
    const sunriseAuctionHouseContract = SunriseAuctionHouseFactory.connect(
      config.addresses.sunriseAuctionHouseProxy,
      wsProvider,
    );

    const bidFilter = sunriseAuctionHouseContract.filters.AuctionBid(null, null, null, null);
    const extendedFilter = sunriseAuctionHouseContract.filters.AuctionExtended(null, null);
    const createdFilter = sunriseAuctionHouseContract.filters.AuctionCreated(null, null, null);
    const settledFilter = sunriseAuctionHouseContract.filters.AuctionSettled(null, null, null);
    const processBidFilter = async (
      sunriseId: BigNumberish,
      sender: string,
      value: BigNumberish,
      extended: boolean,
      event: any,
    ) => {
      const timestamp = (await event.getBlock()).timestamp;
      const transactionHash = event.transactionHash;
      dispatch(
        appendBid(reduxSafeBid({ sunriseId, sender, value, extended, transactionHash, timestamp })),
      );
    };
    const processAuctionCreated = (
      sunriseId: BigNumberish,
      startTime: BigNumberish,
      endTime: BigNumberish,
    ) => {
      dispatch(
        setActiveAuction(reduxSafeNewAuction({ sunriseId, startTime, endTime, settled: false })),
      );
      const sunriseIdNumber = BigNumber.from(sunriseId).toNumber();
      dispatch(push(sunrisePath(sunriseIdNumber)));
      dispatch(setOnDisplayAuctionSunriseId(sunriseIdNumber));
      dispatch(setLastAuctionSunriseId(sunriseIdNumber));
    };
    const processAuctionExtended = (sunriseId: BigNumberish, endTime: BigNumberish) => {
      dispatch(setAuctionExtended({ sunriseId, endTime }));
    };
    const processAuctionSettled = (sunriseId: BigNumberish, winner: string, amount: BigNumberish) => {
      dispatch(setAuctionSettled({ sunriseId, amount, winner }));
    };

    // Fetch the current auction
    const currentAuction = await sunriseAuctionHouseContract.auction();
    dispatch(setFullAuction(reduxSafeAuction(currentAuction)));
    dispatch(setLastAuctionSunriseId(currentAuction.sunriseId.toNumber()));

    // Fetch the previous 24hours of  bids
    const previousBids = await sunriseAuctionHouseContract.queryFilter(bidFilter, 0 - BLOCKS_PER_DAY);
    for (let event of previousBids) {
      if (event.args === undefined) return;
      processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
    }

    sunriseAuctionHouseContract.on(bidFilter, (sunriseId, sender, value, extended, event) =>
      processBidFilter(sunriseId, sender, value, extended, event),
    );
    sunriseAuctionHouseContract.on(createdFilter, (sunriseId, startTime, endTime) =>
      processAuctionCreated(sunriseId, startTime, endTime),
    );
    sunriseAuctionHouseContract.on(extendedFilter, (sunriseId, endTime) =>
      processAuctionExtended(sunriseId, endTime),
    );
    sunriseAuctionHouseContract.on(settledFilter, (sunriseId, winner, amount) =>
      processAuctionSettled(sunriseId, winner, amount),
    );
  };
  loadState();

  return <></>;
};

const PastAuctions: React.FC = () => {
  const { data } = useQuery(latestAuctionsQuery());
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(addPastAuctions({ data }));
  }, [data, dispatch]);

  return <></>;
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ChainSubscriber />
      <React.StrictMode>
        <Web3ReactProvider
          getLibrary={
            provider => new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
          }
        >
          <ApolloProvider client={client}>
            <PastAuctions />
            <DAppProvider config={useDappConfig}>
              <ClientContext.Provider value={datoClient}>
                <App />
                <Updaters />
              </ClientContext.Provider>
            </DAppProvider>
          </ApolloProvider>
        </Web3ReactProvider>
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();