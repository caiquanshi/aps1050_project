pragma solidity ^0.5.0;

contract Market {
address[16] public buyers;
// Adopting a pet
function buy(uint itemId) public returns (uint) {
  require(itemId >= 0 && itemId <= 15);

  buyers[itemId] = msg.sender;

  return itemId;
}
// Retrieving the buyer
function getBuyers() public view returns (address[16] memory) {
  return buyers;
}
}
