pragma solidity ^0.5.0;

contract petTrack {
address[16] public owner

mapping (unit => bool) public have_owner;

// Adopting a pet
function add_owner(string memory _name, string memory _breed, uint _age, string memory _loc, string memory _img) public returns (uint) {
  require(petId >= 0 && petId <= 15);
  require(!have_owner[petId]);
  
  owner[petId] = msg.sender;

  return petId;
}
function getowner() public view returns (address[16] memory) {
  return owner;
}
}