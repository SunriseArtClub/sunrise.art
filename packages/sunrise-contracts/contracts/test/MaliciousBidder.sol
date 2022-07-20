// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

import { ISunriseAuctionHouse } from '../interfaces/ISunriseAuctionHouse.sol';

contract MaliciousBidder {
    function bid(ISunriseAuctionHouse auctionHouse, uint256 tokenId) public payable {
        auctionHouse.createBid{ value: msg.value }(tokenId);
    }

    receive() external payable {
        assembly {
            invalid()
        }
    }
}
