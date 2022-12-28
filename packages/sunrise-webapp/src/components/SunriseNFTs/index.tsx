import { gql, useQuery } from '@apollo/client';
import { Container, Spinner } from 'react-bootstrap';
import Slider from 'react-slick';
import { useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

  const { loading, error, data, fetchMore } = useQuery(SUNRISE_FUND_QUERY, {
    variables: { limit: 8 },
    context: { clientName: 'zora' },
  });

  const slider = useRef<Slider>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const next = () => {
    fetchMore({
      variables: {
        after: data?.tokens?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          tokens: {
            nodes: [...prev?.tokens?.nodes, ...fetchMoreResult?.tokens?.nodes],
            pageInfo: fetchMoreResult?.tokens?.pageInfo,
          },
        });
      },
    }).then(() => {
      setSlideIndex(slideIndex + 1);
      slider?.current?.slickNext();
    });
  };

  const prev = () => {
    setSlideIndex(slideIndex - 1);
    slider?.current?.slickPrev();
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesPerRow: 4,
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesPerRow: 2,
          rows: 2,
        },
      },
    ],
  };

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
    <Container className={classes.gallery}>
      {data && (
        <>
          <Slider ref={slider} {...settings}>
            {data?.tokens?.nodes?.map((nft: any, index: number) => (
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
                  {nft?.token?.metadata?.attributes && nft?.token?.metadata?.attributes.length > 0 && (
                    <ul className={classes.nftList}>
                      <li>
                        <img
                          className={classes.nftIcon}
                          src={
                            `/static/icons/Cloud/` +
                            `${nft?.token?.metadata?.attributes[4].value}`.toUpperCase() +
                            '.png'
                          }
                          alt={nft?.token?.metadata?.attributes[4].value}
                        />
                      </li>
                      <li>
                        <img
                          className={classes.nftIcon}
                          src={
                            `/static/icons/Weather/` +
                            `${nft?.token?.metadata?.attributes[5].value}`.toUpperCase() +
                            '.png'
                          }
                          alt={nft?.token?.metadata?.attributes[5].value}
                        />
                      </li>
                      <li>
                        <img
                          className={classes.nftIcon}
                          src={
                            `/static/icons/Season/` +
                            `${nft?.token?.metadata?.attributes[6].value}`.toUpperCase() +
                            '.png'
                          }
                          alt={nft?.token?.metadata?.attributes[6].value}
                        />
                      </li>
                      <li>
                        <img
                          className={classes.nftIcon}
                          src={
                            `/static/icons/Silhouette/` +
                            `${nft?.token?.metadata?.attributes[7].value}`.toUpperCase() +
                            '.png'
                          }
                          alt={nft?.token?.metadata?.attributes[7].value}
                        />
                      </li>
                      {nft?.token?.metadata?.attributes[8].value.length > 0 && (
                        <li>
                          <img
                            className={classes.nftIcon}
                            src={`/static/icons/Object/OBJECT_1.png`}
                            alt={nft?.token?.metadata?.attributes[8].value}
                          />
                        </li>
                      )}
                      {nft?.token?.metadata?.attributes[9].value.length > 0 && (
                        <li>
                          <img
                            className={classes.nftIcon}
                            src={`/static/icons/Object/OBJECT_2.png`}
                            alt={nft?.token?.metadata?.attributes[9].value}
                          />
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </a>
            ))}
          </Slider>
          <div className={classes.navContainer}>
            <button onClick={() => prev()} className={classes.prev} disabled={slideIndex === 0}>
              Prev
            </button>
            <button onClick={() => next()} className={classes.next}>
              Next
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default SunriseNFTs;
