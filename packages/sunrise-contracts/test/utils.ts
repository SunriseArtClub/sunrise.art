import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { SunriseToken, SunriseTokenFactory, Weth, WethFactory } from '../typechain';

export type TestSigners = {
  deployer: SignerWithAddress;
  account0: SignerWithAddress;
  account1: SignerWithAddress;
  account2: SignerWithAddress;
};

export const getSigners = async (): Promise<TestSigners> => {
  const [deployer, account0, account1, account2] = await ethers.getSigners();
  return {
    deployer,
    account0,
    account1,
    account2,
  };
};

export const deploySunriseToken = async (
  deployer?: SignerWithAddress,
  sunriseArtClub?: string,
  minter?: string,
  proxyRegistryAddress?: string,
  metadataIpfsURI?: string,
): Promise<SunriseToken> => {
  const signer = deployer || (await getSigners()).deployer;
  const factory = new SunriseTokenFactory(signer);

  return factory.deploy(
    sunriseArtClub || signer.address,
    minter || signer.address,
    proxyRegistryAddress || address(0),
    metadataIpfsURI || 'bafybeigvs5oft4zcl4ppq2s5koahgf6tu3wahhaf4ctdtdvrj7gei6xfry',
  );
};

export const deployWeth = async (deployer?: SignerWithAddress): Promise<Weth> => {
  const factory = new WethFactory(deployer || (await await getSigners()).deployer);

  return factory.deploy();
};

/**
 * Return a function used to mint `amount` Sunrise on the provided `token`
 * @param token The Sunrise ERC721 token
 * @param amount The number of Sunrise to mint
 */
export const MintSunrise = (
  token: SunriseToken,
  burnSunriseTokens = true,
): ((amount: number) => Promise<void>) => {
  return async (amount: number): Promise<void> => {
    for (let i = 0; i < amount; i++) {
      await token.mint();
    }
    if (!burnSunriseTokens) return;

    await setTotalSupply(token, amount);
  };
};

/**
 * Mints or burns tokens to target a total supply. Due to Sunrise rewards tokens may be burned and tokenIds will not be sequential
 */
export const setTotalSupply = async (
  token: SunriseToken,
  newTotalSupply: number,
): Promise<void> => {
  const totalSupply = (await token.totalSupply()).toNumber();

  if (totalSupply < newTotalSupply) {
    for (let i = 0; i < newTotalSupply - totalSupply; i++) {
      await token.mint();
    }
    // If Sunrise Art Club team reward tokens were minted totalSupply will be more than expected, so run setTotalSupply again to burn extra tokens
    await setTotalSupply(token, newTotalSupply);
  }

  if (totalSupply > newTotalSupply) {
    for (let i = newTotalSupply; i < totalSupply; i++) {
      await token.burn(i);
    }
  }
};

export const address = (n: number): string => {
  return `0x${n.toString(16).padStart(40, '0')}`;
};
