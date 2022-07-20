import { default as SunriseAuctionHouseABI } from '../abi/contracts/SunriseAuctionHouse.sol/SunriseAuctionHouse.json';
import { task, types } from 'hardhat/config';
import { Interface } from 'ethers/lib/utils';
import { Contract as EthersContract } from 'ethers';

type ContractName =
  | 'WETH'
  | 'SunriseToken'
  | 'SunriseAuctionHouse'
  | 'SunriseAuctionHouseProxyAdmin'
  | 'SunriseAuctionHouseProxy';

interface Contract {
  args?: (string | number | (() => string | undefined))[];
  instance?: EthersContract;
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
}

task('deploy-local', 'Deploy contracts to Hardhat')
  .addOptionalParam('sunrisefund', 'The Sunrise Art Club contract address')
  .addOptionalParam(
    'contractipfsuri',
    'nfts ipfs uri',
    'bafybeigvs5oft4zcl4ppq2s5koahgf6tu3wahhaf4ctdtdvrj7gei6xfry',
    types.string,
  )
  .addOptionalParam('auctionTimeBuffer', 'The auction time buffer (seconds)', 30, types.int) // Default: 30 seconds
  .addOptionalParam('auctionReservePrice', 'The auction reserve price (wei)', 1000000000, types.int) // Default: 1000000000 wei (1 ETH)
  .addOptionalParam(
    'auctionMinIncrementBidPercentage',
    'The auction min increment bid percentage (out of 100)', // Default: 5%
    5,
    types.int,
  )
  .addOptionalParam('auctionDuration', 'The auction duration (seconds)', 60 * 2, types.int) // Default: 2 minutes
  .setAction(async (args, { ethers }) => {
    const network = await ethers.provider.getNetwork();
    if (network.chainId !== 31337) {
      console.log(`Invalid chain id. Expected 31337. Got: ${network.chainId}.`);
      return;
    }

    const proxyRegistryAddress = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';

    const AUCTION_HOUSE_PROXY_NONCE_OFFSET = 4;

    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getTransactionCount();
    const expectedAuctionHouseProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: nonce + AUCTION_HOUSE_PROXY_NONCE_OFFSET,
    });
    const contracts: Record<ContractName, Contract> = {
      WETH: {},
      SunriseToken: {
        args: [
          args.sunrisefund || deployer.address,
          expectedAuctionHouseProxyAddress,
          proxyRegistryAddress,
          args.contractipfsuri,
        ],
      },
      SunriseAuctionHouse: {
        waitForConfirmation: true,
      },
      SunriseAuctionHouseProxyAdmin: {},
      SunriseAuctionHouseProxy: {
        args: [
          () => contracts['SunriseAuctionHouse'].instance?.address,
          () => contracts['SunriseAuctionHouseProxyAdmin'].instance?.address,
          () =>
            new Interface(SunriseAuctionHouseABI).encodeFunctionData('initialize', [
              contracts['SunriseToken'].instance?.address,
              contracts['WETH'].instance?.address,
              args.auctionTimeBuffer,
              args.auctionReservePrice,
              args.auctionMinIncrementBidPercentage,
            ]),
        ],
      },
    };

    for (const [name, contract] of Object.entries(contracts)) {
      const factory = await ethers.getContractFactory(name, {
        libraries: contract?.libraries?.(),
      });

      const deployedContract = await factory.deploy(
        ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
      );

      if (contract.waitForConfirmation) {
        await deployedContract.deployed();
      }

      contracts[name as ContractName].instance = deployedContract;

      console.log(`${name} contract deployed to ${deployedContract.address}`);
    }

    return contracts;
  });
