import { task, types } from 'hardhat/config';
import pinataSDK from '@pinata/sdk';

task('upload-nfts', 'uploads nfts and metadata')
  .addParam('apikey', 'pinata api key', undefined, types.string)
  .addParam('apisecret', 'pinata api secret', undefined, types.string)
  .addParam('ipfshash', 'ipfs hash', undefined, types.string)
  .setAction(async args => {
    const pinata = pinataSDK(args.apikey, args.apisecret);

    await pinata.testAuthentication();

    const resp = await pinata.pinByHash(args.ipfshash);

    console.log(resp);
  });
