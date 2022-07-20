import chai from 'chai';
import { ethers } from 'hardhat';
import { constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { SunriseToken } from '../typechain';
import { deploySunriseToken } from './utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(solidity);
const { expect } = chai;
const IPFS_URL = 'bafybeigvs5oft4zcl4ppq2s5koahgf6tu3wahhaf4ctdtdvrj7gei6xfry';

describe('SunriseToken', () => {
  let sunriseToken: SunriseToken;
  let deployer: SignerWithAddress;
  let sunriseArtClub: SignerWithAddress;
  let snapshotId: number;

  before(async () => {
    [deployer, sunriseArtClub] = await ethers.getSigners();
    sunriseToken = await deploySunriseToken(deployer, sunriseArtClub.address, deployer.address);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await ethers.provider.send('evm_revert', [snapshotId]);
  });

  it('should return correct tokenURI', async () => {
    await (await sunriseToken.mint()).wait();

    const tokenURI = await sunriseToken.tokenURI(1);
    expect(tokenURI).to.equal(`ipfs://${IPFS_URL}/1`);
  });

  it('should set symbol', async () => {
    expect(await sunriseToken.symbol()).to.eq('SUNRISE');
  });

  it('should set name', async () => {
    expect(await sunriseToken.name()).to.eq('Sunrise Art Club');
  });

  it('should emit two transfer logs on mint', async () => {
    const [, , creator, minter] = await ethers.getSigners();

    await (await sunriseToken.mint()).wait();

    await (await sunriseToken.setMinter(minter.address)).wait();
    await (await sunriseToken.transferOwnership(creator.address)).wait();

    const tx = sunriseToken.connect(minter).mint();

    await expect(tx)
      .to.emit(sunriseToken, 'Transfer')
      .withArgs(constants.AddressZero, creator.address, 2);
    await expect(tx).to.emit(sunriseToken, 'Transfer').withArgs(creator.address, minter.address, 2);
  });

  it('should allow minter to burn a sunrise', async () => {
    await (await sunriseToken.mint()).wait();

    const tx = sunriseToken.burn(1);
    await expect(tx).to.emit(sunriseToken, 'SunriseBurned').withArgs(1);
  });

  it('should revert on non-minter mint', async () => {
    const account0AsSunriseErc721Account = sunriseToken.connect(sunriseArtClub);
    await expect(account0AsSunriseErc721Account.mint()).to.be.reverted;
  });

  it('should get max supply', async () => {
    const maxSupply = await sunriseToken.getMaxSupply();
    expect(maxSupply).to.equal(365);
  });

  it('should update sunriseArtClub address from original sunriseArtClub address', async () => {
    const [, , , newSunriseFundaddress] = await ethers.getSigners();

    const sunriseArtClubAccount = sunriseToken.connect(sunriseArtClub);
    await expect(sunriseArtClubAccount.setSunriseArtClub(newSunriseFundaddress.address))
      .to.emit(sunriseArtClubAccount, 'SunriseArtClubUpdated')
      .withArgs(newSunriseFundaddress.address);

    expect(await sunriseToken.sunriseArtClub()).to.equal(newSunriseFundaddress.address);
  });

  it('should revert on non-sunriseArtClub update', async () => {
    const [, , , newSunriseFundaddress] = await ethers.getSigners();

    await expect(sunriseToken.setSunriseArtClub(newSunriseFundaddress.address)).to.be.reverted;
  });

  describe('contractURI', async () => {
    it('should return correct contractURI', async () => {
      expect(await sunriseToken.contractURI()).to.eq(`ipfs://${IPFS_URL}`);
    });
    it('should allow owner to set contractURI', async () => {
      await sunriseToken.setContractURIHash('ABC123');
      expect(await sunriseToken.contractURI()).to.eq('ipfs://ABC123');
    });
    it('should not allow non owner to set contractURI', async () => {
      const [, nonOwner] = await ethers.getSigners();
      await expect(sunriseToken.connect(nonOwner).setContractURIHash('BAD')).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });
});
