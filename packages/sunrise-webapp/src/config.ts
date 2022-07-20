import { ContractAddresses, getContractAddressesForChainOrThrow } from '@sunrise/sdk';
import { ChainId } from '@usedapp/core';

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
  ipfsUri: string;
}

export const IPFS_HASH = 'bafybeiebzqxgcunkdzpmvm25jawar2m32ubjyxyvrjazwz7ehfmpsyqd2i';

type SupportedChains = ChainId.Rinkeby | ChainId.Mainnet | ChainId.Hardhat;

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '4');

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? '';

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return custom || `https://eth-${network}.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return custom || `wss://eth-${network}.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_PROJECT_ID}`;
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
    subgraphApiUri: `https://api.thegraph.com/subgraphs/name/laurendorman/sunrise-art-rinkeby`, // Token & Auction House Proxy Address
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
    ipfsUri: `${IPFS_HASH}`,
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: `https://api.thegraph.com/subgraphs/name/laurendorman/sunrise-art`, // Token & Auction House Proxy Address
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
    ipfsUri: `${IPFS_HASH}`,
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: 'http://0.0.0.0:8000/subgraphs/name/sunrise-fund/sunrise-subgraph',
    enableHistory: false,
    ipfsUri: `${IPFS_HASH}`,
  },
};

const getAddresses = () => {
  try {
    return getContractAddressesForChainOrThrow(CHAIN_ID);
  } catch {
    return {} as ContractAddresses;
  }
};

const config = {
  app: app[CHAIN_ID],
  addresses: getAddresses(),
};

export default config;
