import { default as SunriseAuctionHouseABI } from '../abi/contracts/SunriseAuctionHouse.sol/SunriseAuctionHouse.json';
import { Interface } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';
import promptjs from 'prompt';

promptjs.colors = false;
promptjs.message = '> ';
promptjs.delimiter = '';

type ContractName =
  // | 'SunriseToken'
  | 'SunriseAuctionHouse'
  // | 'SunriseAuctionHouseProxyAdmin'
  | 'SunriseAuctionHouseProxy';

interface Contract {
  args?: (string | number | (() => string | undefined))[];
  address?: string;
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
}

task('deploy', 'Deploys SunriseAuctionHouse, SunriseToken')
  .addParam(
    'sunrisefund',
    'The Sunrise Art Club address',
    '0x2EfDC5AEC299BF959cb0f0D8fF42268686731614',
    types.string,
  )
  .addParam(
    'contractipfsuri',
    'Contract IPFS URI',
    'bafybeidyxupev772sgi4g7ld4b77fej552ltdxx3ufxvdeerh3qwyhs6nq',
    types.string,
  )
  .addOptionalParam('auctionTimeBuffer', 'The auction time buffer (seconds)', 5 * 60, types.int)
  .addOptionalParam('auctionReservePrice', 'The auction reserve price (wei)', 0, types.int) // 0.25 ETH
  .addOptionalParam(
    'auctionMinIncrementBidPercentage',
    'The auction min increment bid percentage (out of 100)',
    5,
    types.int,
  )
  .setAction(async (args, { ethers }) => {
    const network = await ethers.provider.getNetwork();

    console.log('Current network: ', network.chainId);

    // const proxyRegistryAddress =
    //   network.chainId === 1
    //     ? '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
    //     : '0xf57b2c51ded3a29e6891aba85459d600256cf317';

    const wethAddress =
      network.chainId === 1
        ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
        : '0xc778417e063141139fce010982780140aa0cd5ab';

    const sunriseTokenAddress =
      network.chainId === 1
        ? '0x400b77c8b985Bbfba6189580Af3C6e4074E71Ed5'
        : '0x68432924e9986ed2Ac5F95b455204DB5B3C87aBb';

    const auctionHouseProxyAdminAddress =
      network.chainId === 1
        ? '0xCCE2E9AB415918C97C7E64E8108fC7ef783656C5'
        : '0xDAb5953F6cEE204b27BFFf6DBef4B6cb68D5DF62';

    // const AUCTION_HOUSE_PROXY_NONCE_OFFSET = 3;

    // const [deployer] = await ethers.getSigners();
    // const nonce = await deployer.getTransactionCount();
    // const expectedAuctionHouseProxyAddress = ethers.utils.getContractAddress({
    //   from: deployer.address,
    //   nonce: nonce + AUCTION_HOUSE_PROXY_NONCE_OFFSET,
    // });

    const contracts: Record<ContractName, Contract> = {
      // SunriseToken: {
      //   args: [
      //     args.sunrisefund,
      //     expectedAuctionHouseProxyAddress,
      //     proxyRegistryAddress,
      //     args.contractipfsuri,
      //   ],
      // },
      SunriseAuctionHouse: {
        waitForConfirmation: true,
      },
      // SunriseAuctionHouseProxyAdmin: {},
      SunriseAuctionHouseProxy: {
        args: [
          () => contracts['SunriseAuctionHouse'].address,
          () => auctionHouseProxyAdminAddress,
          () =>
            new Interface(SunriseAuctionHouseABI).encodeFunctionData('initialize', [
              sunriseTokenAddress,
              wethAddress,
              args.auctionTimeBuffer,
              args.auctionReservePrice,
              args.auctionMinIncrementBidPercentage,
            ]),
        ],
      },
    };

    for (const [name, contract] of Object.entries(contracts)) {
      let gasPrice = await ethers.provider.getGasPrice();
      const gasInGwei = Math.round(Number(ethers.utils.formatUnits(gasPrice, 'gwei')));

      promptjs.start();

      let result = await promptjs.get([
        {
          properties: {
            gasPrice: {
              type: 'integer',
              required: true,
              description: 'Enter a gas price (gwei)',
              default: gasInGwei,
            },
          },
        },
      ]);

      gasPrice = ethers.utils.parseUnits(result.gasPrice.toString(), 'gwei');

      const factory = await ethers.getContractFactory(name, {
        libraries: contract?.libraries?.(),
      });

      const deploymentGas = await factory.signer.estimateGas(
        factory.getDeployTransaction(
          ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
          {
            gasPrice,
          },
        ),
      );
      const deploymentCost = deploymentGas.mul(gasPrice);

      console.log(
        `Estimated cost to deploy ${name}: ${ethers.utils.formatUnits(
          deploymentCost,
          'ether',
        )} ETH`,
      );

      result = await promptjs.get([
        {
          properties: {
            confirm: {
              type: 'string',
              description: 'Type "DEPLOY" to confirm:',
            },
          },
        },
      ]);

      if (result.confirm != 'DEPLOY') {
        console.log('Exiting');
        return;
      }

      console.log(
        'Deploying contract with arguments: ',
        ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
      );

      const deployedContract = await factory.deploy(
        ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
        {
          gasPrice,
        },
      );

      if (contract.waitForConfirmation) {
        await deployedContract.deployed();
      }

      contracts[name as ContractName].address = deployedContract.address;

      console.log(`${name} contract deployed to ${deployedContract.address}`);
    }

    return contracts;
  });
