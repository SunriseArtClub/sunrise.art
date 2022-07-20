import { ethers } from 'hardhat';

async function main() {
  // Contracts to deploy
  const SunriseToken = await ethers.getContractFactory('SunriseToken');
  const SunriseAuctionHouse = await ethers.getContractFactory('SunriseAuctionHouse');

  // Deploy contracts
  const sunrise = await SunriseToken.deploy();
  const auction = await SunriseAuctionHouse.deploy();

  console.log('Sunrise Token deployed to:', sunrise.address);
  console.log('Sunrise Auction House deployed to:', auction.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
