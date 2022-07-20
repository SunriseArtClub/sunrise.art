import { SunriseTokenFactory, SunriseAuctionHouseFactory } from '@sunrise/contracts';

export interface ContractAddresses {
  sunriseToken: string;
  sunriseAuctionHouse: string;
  sunriseAuctionHouseProxy: string;
  sunriseAuctionHouseProxyAdmin: string;
  Multicall?: string;
}

export interface Contracts {
  sunriseTokenContract: ReturnType<typeof SunriseTokenFactory.connect>;
  sunriseAuctionHouseContract: ReturnType<typeof SunriseAuctionHouseFactory.connect>;
}

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42,
  Local = 31337,
}
