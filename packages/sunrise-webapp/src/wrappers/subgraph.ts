import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BigNumberish } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';

export interface IBid {
  id: string;
  bidder: {
    id: string;
  };
  amount: BigNumber;
  blockNumber: number;
  blockTimestamp: number;
  txIndex?: number;
  sunrise: {
    id: number;
    startTime?: BigNumberish;
    endTime?: BigNumberish;
    settled?: boolean;
  };
}

export const auctionQuery = (auctionId: number) => gql`
{
	auction(id: ${auctionId}) {
	  id
	  amount
	  settled
	  bidder {
	  	id
	  }
	  startTime
	  endTime
	  sunrise {
		id
		owner {
		  id
		}
	  }
	  bids {
		id
		blockNumber
		txIndex
		amount
	  }
	}
  }
  `;

export const bidsByAuctionQuery = (auctionId: string) => gql`
 {
	bids(where:{auction: "${auctionId}"}) {
	  id
	  amount
	  blockNumber
	  blockTimestamp
	  txIndex
	  bidder {
	  	id
	  }
	  sunrise {
		id
	  }
	}
  }
 `;

export const sunriseQuery = (id: string) => gql`
 {
	sunrise(id:"${id}") {
	  id
	  owner {
		id
	  }
	}
  }
 `;

export const sunrisesIndex = () => gql`
  {
    sunrises {
      id
      owner {
        id
      }
    }
  }
`;

export const latestAuctionsQuery = () => gql`
  {
    auctions(orderBy: startTime, orderDirection: desc) {
      id
      amount
      settled
      bidder {
        id
      }
      startTime
      endTime
      sunrise {
        id
        owner {
          id
        }
      }
      bids {
        id
        amount
        blockNumber
        blockTimestamp
        txIndex
        bidder {
          id
        }
      }
    }
  }
`;

export const latestBidsQuery = (first: number = 10) => gql`
{
	bids(
	  first: ${first},
	  orderBy:blockTimestamp,
	  orderDirection: desc
	) {
	  id
	  bidder {
		id
	  }
	  amount
	  blockTimestamp
	  txIndex
	  blockNumber
	  auction {
		id
		startTime
		endTime
		settled
	  }
	}
  }  
`;

export const clientFactory = (uri: string) =>
  new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
