import { gql, useQuery } from '@apollo/client';
import { Container, Spinner } from 'react-bootstrap';
import classes from './SunriseNFTs.module.css';

const SunriseNFTs = () => {
  const SUNRISE_FUND_QUERY = gql`
    query SunriseFundNFTs($after: String, $limit: Int!) {
      tokens(
        networks: [{ network: ETHEREUM, chain: MAINNET }]
        pagination: { after: $after, limit: $limit }
        where: {
          ownerAddresses: "sunrisefund.eth"
          collectionAddresses: "0x400b77c8b985bbfba6189580af3c6e4074e71ed5"
        }
      ) {
        nodes {
          token {
            collectionAddress
            tokenId
            name
            owner
            image {
              mediaEncoding {
                ... on ImageEncodingTypes {
                  poster
                }
              }
            }
            metadata
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(SUNRISE_FUND_QUERY, {
    variables: { limit: 8 },
    context: { clientName: 'zora' },
  });

  // const next = () => {
  //   fetchMore({
  //     variables: {
  //       after: data?.tokens?.pageInfo?.endCursor,
  //     },
  //   });
  // };

  if (loading)
    return (
      <Container className={classes.container}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  if (error) return null;

  return (
    <Container className={classes.container}>
      {data &&
        data?.tokens?.nodes?.map((nft: any, index: number) => (
          <a
            href={`https://opensea.io/assets/0x400b77c8b985bbfba6189580af3c6e4074e71ed5/${nft?.token?.tokenId}`}
            key={index}
            target="_blank"
            rel="noreferrer"
          >
            <div className={classes.nft}>
              <img
                src={nft?.token?.image?.mediaEncoding?.poster}
                className={classes.nftImage}
                alt={nft?.token?.name}
              />
              <div className={classes.tokenInfo}>
                <h2>{nft?.token?.name}</h2>
              </div>
            </div>
          </a>
        ))}
    </Container>
  );
};

export default SunriseNFTs;
