import { task, types } from 'hardhat/config';

task('mint-sunrise', 'Mints a Sunrise')
  .addOptionalParam(
    'sunriseToken',
    'The `SunriseToken` contract address',
    '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    types.string,
  )
  .setAction(async ({ sunriseToken }, { ethers }) => {
    const nftFactory = await ethers.getContractFactory('SunriseToken');
    const nftContract = nftFactory.attach(sunriseToken);

    const receipt = await (await nftContract.mint()).wait();
    const sunriseCreated = receipt.events?.[1];
    const { tokenId } = sunriseCreated?.args;

    console.log(`Sunrise minted with ID: ${tokenId.toString()}.`);
  });
