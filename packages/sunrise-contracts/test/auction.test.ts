import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { constants } from 'ethers';
import { ethers, upgrades } from 'hardhat';
import { MaliciousBidderFactory, SunriseAuctionHouse, SunriseToken, Weth } from '../typechain';
import { deploySunriseToken, deployWeth } from './utils';

chai.use(solidity);
const { expect } = chai;

describe('SunriseAuctionHouse', () => {
  let sunriseAuctionHouse: SunriseAuctionHouse;
  let sunriseToken: SunriseToken;
  let weth: Weth;
  let deployer: SignerWithAddress;
  let sunriseArtClub: SignerWithAddress;
  let bidderA: SignerWithAddress;
  let bidderB: SignerWithAddress;
  let snapshotId: number;
  let originalMinterSnapshotId: number;

  const TIME_BUFFER = 15 * 60;
  const RESERVE_PRICE = 1;
  const MIN_INCREMENT_BID_PERCENTAGE = 5;
  const DURATION = 60 * 60 * 24;

  async function deploy(deployer?: SignerWithAddress) {
    const auctionHouseFactory = await ethers.getContractFactory('SunriseAuctionHouse', deployer);
    return upgrades.deployProxy(auctionHouseFactory, [
      sunriseToken.address,
      weth.address,
      TIME_BUFFER,
      RESERVE_PRICE,
      MIN_INCREMENT_BID_PERCENTAGE,
      DURATION,
    ]) as Promise<SunriseAuctionHouse>;
  }

  before(async () => {
    [deployer, sunriseArtClub, bidderA, bidderB] = await ethers.getSigners();

    sunriseToken = await deploySunriseToken(deployer, sunriseArtClub.address, deployer.address);
    weth = await deployWeth(deployer);
    sunriseAuctionHouse = await deploy(deployer);
    originalMinterSnapshotId = await ethers.provider.send('evm_snapshot', []);

    await sunriseToken.setMinter(sunriseAuctionHouse.address);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await ethers.provider.send('evm_revert', [snapshotId]);
  });

  it('should revert if a second initialization is attempted', async () => {
    const tx = sunriseAuctionHouse.initialize(
      sunriseToken.address,
      weth.address,
      TIME_BUFFER,
      RESERVE_PRICE,
      MIN_INCREMENT_BID_PERCENTAGE,
      DURATION,
    );
    await expect(tx).to.be.revertedWith('Initializable: contract is already initialized');
  });

  it('should allow the sunriseArtClub to unpause the contract and create the first auction', async () => {
    const tx = await sunriseAuctionHouse.unpause();
    await tx.wait();

    const auction = await sunriseAuctionHouse.auction();
    expect(auction.startTime.toNumber()).to.be.greaterThan(0);
  });

  it('should allow sunriseArtClub to change the duration', async () => {
    const tx = await sunriseAuctionHouse.setDuration(300);
    await tx.wait();

    const auction = await sunriseAuctionHouse.auction();
    expect(auction.duration.toNumber()).to.eq(300);
  });

  it('should revert if a user creates a bid for an inactive auction', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();
    const tx = sunriseAuctionHouse.connect(bidderA).createBid(sunriseId.add(1), {
      value: RESERVE_PRICE,
    });

    await expect(tx).to.be.revertedWith('Sunrise not up for auction');
  });

  it('should revert if a user creates a bid for an expired auction', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 25]); // Add 25 hours

    const { sunriseId } = await sunriseAuctionHouse.auction();
    const tx = sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });

    await expect(tx).to.be.revertedWith('Auction expired');
  });

  it('should revert if a user creates a bid with an amount below the reserve price', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();
    const tx = sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE - 1,
    });

    await expect(tx).to.be.revertedWith('Must send at least reservePrice');
  });

  it('should revert if a user creates a bid less than the min bid increment percentage', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();
    await sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE * 50,
    });
    const tx = sunriseAuctionHouse.connect(bidderB).createBid(sunriseId, {
      value: RESERVE_PRICE * 51,
    });

    await expect(tx).to.be.revertedWith(
      'Must send more than last bid by minBidIncrementPercentage amount',
    );
  });

  it('should refund the previous bidder when the following user creates a bid', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();
    await sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });

    const bidderAPostBidBalance = await bidderA.getBalance();
    await sunriseAuctionHouse.connect(bidderB).createBid(sunriseId, {
      value: RESERVE_PRICE * 2,
    });
    const bidderAPostRefundBalance = await bidderA.getBalance();

    expect(bidderAPostRefundBalance).to.equal(bidderAPostBidBalance.add(RESERVE_PRICE));
  });

  it('should cap the maximum bid griefing cost at 30K gas + the cost to wrap and transfer WETH', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();

    const maliciousBidderFactory = new MaliciousBidderFactory(bidderA);
    const maliciousBidder = await maliciousBidderFactory.deploy();

    const maliciousBid = await maliciousBidder
      .connect(bidderA)
      .bid(sunriseAuctionHouse.address, sunriseId, {
        value: RESERVE_PRICE,
      });
    await maliciousBid.wait();

    const tx = await sunriseAuctionHouse.connect(bidderB).createBid(sunriseId, {
      value: RESERVE_PRICE * 2,
      gasLimit: 1_000_000,
    });
    const result = await tx.wait();

    expect(result.gasUsed.toNumber()).to.be.lessThan(200_000);
    expect(await weth.balanceOf(maliciousBidder.address)).to.equal(RESERVE_PRICE);
  });

  it('should emit an `AuctionBid` event on a successful bid', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();
    const tx = sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });

    await expect(tx)
      .to.emit(sunriseAuctionHouse, 'AuctionBid')
      .withArgs(sunriseId, bidderA.address, RESERVE_PRICE, false);
  });

  it('should emit an `AuctionExtended` event if the auction end time is within the time buffer', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId, endTime } = await sunriseAuctionHouse.auction();

    await ethers.provider.send('evm_setNextBlockTimestamp', [endTime.sub(60 * 5).toNumber()]); // Subtract 5 mins from current end time

    const tx = sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });

    await expect(tx)
      .to.emit(sunriseAuctionHouse, 'AuctionExtended')
      .withArgs(sunriseId, endTime.add(60 * 10));
  });

  it('should revert if auction settlement is attempted while the auction is still active', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();

    await sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });
    const tx = sunriseAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    await expect(tx).to.be.revertedWith("Auction hasn't completed");
  });

  it('should emit `AuctionSettled` and `AuctionCreated` events if all conditions are met', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();

    await sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });

    await ethers.provider.send('evm_increaseTime', [DURATION + 3600]); // Add 14 hours
    const tx = await sunriseAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    const receipt = await tx.wait();
    const { timestamp } = await ethers.provider.getBlock(receipt.blockHash);

    const settledEvent = receipt.events?.find(e => e.event === 'AuctionSettled');
    const createdEvent = receipt.events?.find(e => e.event === 'AuctionCreated');

    expect(settledEvent?.args?.sunriseId).to.equal(sunriseId);
    expect(settledEvent?.args?.winner).to.equal(bidderA.address);
    expect(settledEvent?.args?.amount).to.equal(RESERVE_PRICE);

    expect(createdEvent?.args?.sunriseId).to.equal(sunriseId.add(1));
    expect(createdEvent?.args?.startTime).to.equal(timestamp);
    expect(createdEvent?.args?.endTime).to.equal(timestamp + DURATION);
  });

  it('should not create a new auction if the auction house is paused and unpaused while an auction is ongoing', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    await (await sunriseAuctionHouse.pause()).wait();

    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();

    expect(sunriseId).to.equal(1);
  });

  it('should create a new auction if the auction house is paused and unpaused after an auction is settled', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();

    await sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 25]); // Add 25 hours

    await (await sunriseAuctionHouse.pause()).wait();

    const settleTx = sunriseAuctionHouse.connect(bidderA).settleAuction();

    await expect(settleTx)
      .to.emit(sunriseAuctionHouse, 'AuctionSettled')
      .withArgs(sunriseId, bidderA.address, RESERVE_PRICE);

    const unpauseTx = await sunriseAuctionHouse.unpause();
    const receipt = await unpauseTx.wait();
    const { timestamp } = await ethers.provider.getBlock(receipt.blockHash);

    const createdEvent = receipt.events?.find(e => e.event === 'AuctionCreated');

    expect(createdEvent?.args?.sunriseId).to.equal(sunriseId.add(1));
    expect(createdEvent?.args?.startTime).to.equal(timestamp);
    expect(createdEvent?.args?.endTime).to.equal(timestamp + DURATION);
  });

  it('should settle the current auction and pause the contract if the minter is updated while the auction house is unpaused', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();

    await sunriseAuctionHouse.connect(bidderA).createBid(sunriseId, {
      value: RESERVE_PRICE,
    });

    await sunriseToken.setMinter(constants.AddressZero);

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 25]); // Add 25 hours

    const settleTx = sunriseAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    await expect(settleTx)
      .to.emit(sunriseAuctionHouse, 'AuctionSettled')
      .withArgs(sunriseId, bidderA.address, RESERVE_PRICE);

    const paused = await sunriseAuctionHouse.paused();

    expect(paused).to.equal(true);
  });

  it('should transfer sunrise to sunriseArtClub on auction settlement if no bids are received', async () => {
    await (await sunriseAuctionHouse.unpause()).wait();

    const { sunriseId } = await sunriseAuctionHouse.auction();

    await ethers.provider.send('evm_increaseTime', [60 * 60 * 14]); // Add 14 hours

    const tx = sunriseAuctionHouse.connect(bidderA).settleCurrentAndCreateNewAuction();

    await expect(tx)
      .to.emit(sunriseAuctionHouse, 'AuctionSettled')
      .withArgs(sunriseId, deployer.address, 0);
  });
});
