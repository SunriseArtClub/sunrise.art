import { useContractCall } from '@usedapp/core';
import { BigNumber as EthersBN, utils } from 'ethers';
import { SunriseTokenABI } from '@sunrise/contracts';
import config from '../config';

export interface ISunriseToken {
  name: string;
  description: string;
  image: string;
  attributes: any;
}

const abi = new utils.Interface(SunriseTokenABI);

export const useSunriseToken = (sunriseId: EthersBN) => {
  const [sunriseURI] =
    useContractCall<[string]>({
      abi,
      address: config.addresses.sunriseToken,
      method: 'tokenURI',
      args: [sunriseId],
    }) || [];

  if (!sunriseURI) {
    return;
  }

  return sunriseURI;
};
