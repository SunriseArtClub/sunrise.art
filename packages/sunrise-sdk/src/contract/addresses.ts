import { ChainId, ContractAddresses } from './types';

const chainIdToAddresses: { [chainId: number]: ContractAddresses } = {
  [ChainId.Mainnet]: {
    sunriseToken: '0x400b77c8b985Bbfba6189580Af3C6e4074E71Ed5',
    sunriseAuctionHouse: '0x00Decc285a43B4c736269FA50588F3C493Daf990',
    sunriseAuctionHouseProxy: '0x330AB637D68808896E1E3be2D9fC85152C6bf35d',
    sunriseAuctionHouseProxyAdmin: '0xCCE2E9AB415918C97C7E64E8108fC7ef783656C5',
  },
  [ChainId.Rinkeby]: {
    sunriseToken: '0x68432924e9986ed2Ac5F95b455204DB5B3C87aBb',
    sunriseAuctionHouse: '0x73918Ac64785eB779B0C1069bDCfA94eC5D8CFA2',
    sunriseAuctionHouseProxy: '0x45Ed41392Bfce8190Bb037999D1E5CbABDB15aad',
    sunriseAuctionHouseProxyAdmin: '0xDAb5953F6cEE204b27BFFf6DBef4B6cb68D5DF62',
  },
  [ChainId.Local]: {
    sunriseToken: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    sunriseAuctionHouse: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    sunriseAuctionHouseProxy: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    sunriseAuctionHouseProxyAdmin: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    Multicall: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  },
};

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param chainId The desired chainId
 */
export const getContractAddressesForChainOrThrow = (chainId: number): ContractAddresses => {
  if (!chainIdToAddresses[chainId]) {
    throw new Error(
      `Unknown ChainId (${chainId}). No known contracts have been deployed on this chain.`,
    );
  }
  return chainIdToAddresses[chainId];
};
