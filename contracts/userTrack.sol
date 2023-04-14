pragma solidity ^0.5.0;

contract UserTrack{
  
  struct petList {
    uint petCount;
    uint[16] pets; 
  }

  mapping (address => petList)  userlist; 

  // Adopting a pet
  function adopt(uint petId) public returns (uint) {
    
    userlist[msg.sender].pets[userlist[msg.sender].petCount] = petId;
    userlist[msg.sender].petCount ++;
    return petId;

  }
  function getAdoptersPetCount() view public returns (uint) {
    return userlist[msg.sender].petCount;
  }

  function getAdoptersPets() view public  returns (uint[16] memory) {
    return userlist[msg.sender].pets;
  }
}