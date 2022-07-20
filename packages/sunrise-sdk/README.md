# @sunrise/sdk

## Development

### Install dependencies

```sh
yarn
```

### Run tests

```sh
yarn test
```

## Usage

The Sunrise SDK contains useful tooling for interacting with the Sunrise protocol.

### Contracts

**Get Contract Addresses**

```ts
import { ChainId, getContractAddressesForChainOrThrow } from '@sunrise/sdk';

const { sunriseToken } = getContractAddressesForChainOrThrow(ChainId.Mainnet);
```

**Get Contract Instances**

```ts
import { ChainId, getContractsForChainOrThrow } from '@sunrise/sdk';

const provider = new providers.JsonRpcProvider(RPC_URL);

const { sunriseTokenContract } = getContractsForChainOrThrow(ChainId.Mainnet, provider);
```

**Get Contract ABIs**

```ts
import { SunriseTokenABI } from '@sunrise/sdk';
```
