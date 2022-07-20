import { task } from 'hardhat/config';

type ContractName =
  | 'SunriseToken'
  | 'SunriseAuctionHouse'
  | 'SunriseAuctionHouseProxyAdmin'
  | 'SunriseAuctionHouseProxy';

interface VerifyArgs {
  address: string;
  constructorArguments?: (string | number)[];
  libraries?: Record<string, string>;
}

const contracts: Record<ContractName, VerifyArgs> = {
  SunriseToken: {
    address: '0xD611341e9831FA81Df3421b677575feEc86c6b68', // Sunrise Token Address
    constructorArguments: [
      '0xd55ac2574F70314579Bc7009c009e84a1e7faAF3', // Sunrise Deployer Address
      '0x236866A90DF0EAf745C0c448922156e00d90B862', // Auction House Proxy Address
      '0xf57b2c51ded3a29e6891aba85459d600256cf317', // Proxy Registry Address
      'bafybeiebzqxgcunkdzpmvm25jawar2m32ubjyxyvrjazwz7ehfmpsyqd2i', // IPFS URI
    ],
  },
  SunriseAuctionHouse: {
    address: '0xB9Ed30fF91A1088CE4b1Ea758E9768c673E0D8f8',
  },
  SunriseAuctionHouseProxyAdmin: {
    address: '0x998A5f06c7234c01d0682d32AeB16D0b5fe8B30E', // Auction House Proxy Admin
  },
  SunriseAuctionHouseProxy: {
    address: '0x236866A90DF0EAf745C0c448922156e00d90B862', // Auction House Proxy Address
    constructorArguments: [
      '0xB9Ed30fF91A1088CE4b1Ea758E9768c673E0D8f8', // Auction House Address
      '0x998A5f06c7234c01d0682d32AeB16D0b5fe8B30E', // Auction House Proxy Admin
      '0x5b1987cd000000000000000000000000d611341e9831fa81df3421b677575feec86c6b68000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000000000000000000000000000000000000000005',
    ],
  },
};

task('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {
  for (const [name, args] of Object.entries(contracts)) {
    console.log(`Verifying ${name}...`);
    try {
      await hre.run('verify:verify', {
        ...args,
      });
    } catch (e) {
      console.error(e);
    }
  }
});
