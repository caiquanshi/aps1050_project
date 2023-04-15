pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Market.sol";

contract TestMarket {
    // The address of the market contract to be tested
    Market market = Market(DeployedAddresses.Market());

    // The id of the item that will be used for testing
    uint expectedItemId = 8;

    // The expected buyer of the item is this contract
    address expectedBuyer = address(this);

    // Testing the buy() function
    function testUserCanOrderItem() public {
        uint returnedId = market.order(expectedItemId);

        Assert.equal(returnedId, expectedItemId, "Buying the expected item should match what is returned.");
    }

    // Testing retrieval of a single item's buyer
    function testGetBuyerAddressByItemId() public {
        address buyers = market.buyers(expectedItemId);

        Assert.equal(buyers, expectedBuyer, "Buyer of the expected item should be this contract");
    }

    // Testing retrieval of all item buyers
    function testGetBuyerAddressByItemIdInArray() public {
        // Store buyers in memory rather than contract's storage
        address[16] memory buyers = market.getBuyers();

        Assert.equal(buyers[expectedItemId], expectedBuyer, "Buyer of the expected item should be this contract");
    }
}
