import { NFTStorage, File } from 'nft.storage';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import csv from 'csv-parser';
import { createReadStream } from 'fs';

const ignoredFiles = ['.DS_Store'];

type row = {
  sunrise: string;
  name: string;
  description: string;
  'hue 1': string;
  'hue 2': string;
  'hue 3': string;
  coverage: string;
  cloud: string;
  weather: string;
  season: string;
  silhouette: string;
  'object 1': string;
  'object 2': string;
  date: string;
};

type Attribute = {
  trait_type: string;
  value: string;
};

type erc721Metadata = {
  name: string;
  description: string;
  image?: string;
  attributes: Attribute[];
};

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! });

const uploadNftAssets = async (path: string) => {
  const files = readdirSync(path).filter(fileName => !ignoredFiles.includes(fileName));
  const fileObjs = files.map(fileName => {
    const name = fileName.split('.')[0];
    const filePath = join(path, fileName);
    return new File([readFileSync(filePath)], name);
  });
  return await client.storeDirectory(fileObjs);
};

const readCSV = (cid: string, csvPath: string) => {
  const sunrisesToMetadata: Record<string, erc721Metadata> = {};
  const readableStream = createReadStream(csvPath).pipe(csv());
  readableStream
    .on('data', (d: row) => {
      console.log(d);
      sunrisesToMetadata[d.sunrise] = {
        name: d.name,
        description: d.description,
        image: ['ipfs:/', cid, d.sunrise].join('/'),
        attributes: [
          { trait_type: 'hue 1', value: d['hue 1'] },
          { trait_type: 'hue 2', value: d['hue 2'] },
          { trait_type: 'hue 3', value: d['hue 3'] },
          { trait_type: 'coverage', value: d['coverage'] },
          { trait_type: 'cloud', value: d['cloud'] },
          { trait_type: 'weather', value: d['weather'] },
          { trait_type: 'season', value: d['season'] },
          { trait_type: 'silhouette', value: d['silhouette'] },
          { trait_type: 'object 1', value: d['object 1'] },
          { trait_type: 'object 2', value: d['object 2'] },
          { trait_type: 'date', value: d['date'] },
        ],
      };
    })
    .on('end', () => {
      readableStream.destroy();
      uploadNftMetadata(sunrisesToMetadata, cid);
    });
};

export const uploadNftMetadata = async (
  sunrisesToMetadata: Record<string, erc721Metadata>,
  assetsCID: string,
): Promise<void> => {
  const jsonPath = join(__dirname, 'sunrises_json');

  if (!existsSync(jsonPath)) {
    mkdirSync(jsonPath);
  }

  const files = Object.keys(sunrisesToMetadata);
  files.forEach(name => {
    const metadata = sunrisesToMetadata[name];
    const metadataPath = join(jsonPath, `${name}.json`);
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  });

  const jsonFileNames = readdirSync(jsonPath);
  const jsonFileObjs = jsonFileNames.map(fileName => {
    const name = fileName.split('.')[0];
    const filePath = join(jsonPath, fileName);
    return new File([readFileSync(filePath)], name);
  });

  const metadataCID = await client.storeDirectory(jsonFileObjs);

  console.log(`Assets Directory CID: ${assetsCID}`);
  console.log(`Metadata Directory CID: ${metadataCID}`);
};

const executor = async (args: string[]): Promise<void> => {
  const [assetsPath, csvPath] = args;
  const assetsCID = await uploadNftAssets(assetsPath);
  readCSV(assetsCID, csvPath);
};

executor(process.argv.slice(-2));
