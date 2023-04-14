pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/UserTrack.sol";

contract TestUserTrack {
// The address of the adoption contract to be tested
 UserTrack userTrack = UserTrack(DeployedAddresses.UserTrack());

// The id of the pet that will be used for testing
 uint expectedPetId = 8;
 uint expectedPetIdTwo = 7;
//The expected owner of adopted pet is this contract
 address expectedAdopter = address(this);

// Testing the adopt() function
function testUserCanAdoptPet() public {
  uint returnedId = userTrack.adopt(expectedPetId);

  Assert.equal(returnedId, expectedPetId, "Adoption of the expected pet should match what is returned.");
}

// Testing retrieval of a single pet's owner
function testGetPetCount() public {
  uint returnPetCount = userTrack.getAdoptersPetCount();

  Assert.equal(returnPetCount, 1, "petServed should be this contract");
}

function testGetPet() public {
  uint[16] memory  returnPetList = userTrack.getAdoptersPets();

  Assert.equal(returnPetList[0], expectedPetId, "userServed should be this contract");
}

// Testing retrieval of all pet owners
function testAdoptOneMorePetForSameUser() public {
  uint returnedId = userTrack.adopt(expectedPetIdTwo);

  Assert.equal(returnedId, expectedPetIdTwo, "Adoption of the expected pet should match what is returned.");

}
// Testing retrieval of a single pet's owner
function testGetPetCountTwo() public {
 uint returnPetCount = userTrack.getAdoptersPetCount();

  Assert.equal(returnPetCount, 2, "petServed should be this contract");
}

function testGetPetTwo() public {
  uint[16] memory returnPetList = userTrack.getAdoptersPets();

  Assert.equal(returnPetList[1], expectedPetIdTwo, "userServed should be this contract");
}

}