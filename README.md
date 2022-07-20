# Sunrise Art Club Monorepo

## Contributing

If you're interested in contributing to Sunrise Art Club repos we're excited to have you. Please discuss any changes in the [Sunrise Art Club Discord server](https://discord.com/invite/y9NFsjdgcb) prior to contributing to reduce duplication of effort and in case there is any prior resources or art that may be useful to you.

## Packages

### sunrise-contracts

The [sunrise contracts](packages/sunrise-contracts) is the suite of Solidity contracts powering Sunrise Art Club.

### sunrise-sdk

The [sunrise sdk](packages/sunrise-sdk) exposes the Sunrise contract addresses, ABIs, and instances as well as image encoding and SVG building utilities.

### sunrise-subgraph

In order to make retrieving more complex data from the auction history, [sunrise subgraph](packages/sunrise-subgraph) contains subgraph manifests that are deployed onto [The Graph](https://thegraph.com).

### sunrise-webapp

The [sunrise webapp](packages/sunrise-webapp) is the frontend for interacting with Sunrise auctions as hosted at [sunrise.art](https://sunrise.art).

## Quickstart

### Install dependencies

```sh
yarn
```

### Build all packages

```sh
yarn build
```

### Run Linter

```sh
yarn lint
```

### Run Prettier

```sh
yarn format
```
