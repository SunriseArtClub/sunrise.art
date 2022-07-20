export enum ExternalURL {
  discord,
  twitter,
  instagram,
  notion,
  fund,
  facebook,
  snapshot,
  opensea,
  contracts
}

export const externalURL = (externalURL: ExternalURL) => {
  switch (externalURL) {
    case ExternalURL.discord:
      return 'https://discord.com/invite/y9NFsjdgcb';
    case ExternalURL.twitter:
      return 'https://twitter.com/ilovesunriseart';
    case ExternalURL.instagram:
      return 'https://instagram.com/ilovesunriseart';
    case ExternalURL.notion:
      return 'https://sunriseart.notion.site';
    case ExternalURL.fund:
      return 'https://etherscan.io/address/0x2EfDC5AEC299BF959cb0f0D8fF42268686731614';
    case ExternalURL.facebook:
      return 'http://facebook.com/ilovesunriseart';
    case ExternalURL.snapshot:
      return 'https://snapshot.org/#/sunrisefund.eth';
    case ExternalURL.opensea:
      return 'https://opensea.io/collection/sunrise-art';
    case ExternalURL.contracts:
      return 'https://sunriseart.notion.site/c059fb993e9c40bcb92a0c15674c3db7';
  }
};
