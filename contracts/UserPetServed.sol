pragma solidity ^0.5.0;

contract UserPetServed {
  
uint public petServed;

uint public userServed;

mapping (address => bool) private oldUser;


// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);
  
  petServed ++;

  if (!oldUser[msg.sender]){
    userServed ++;
    oldUser[msg.sender] = true;
  }
  return petId;
}

}