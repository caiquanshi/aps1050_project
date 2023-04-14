pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/UserPetServed.sol";

contract TestUserPetServed {
// The address of the adoption contract to be tested
 UserPetServed userPetServed = UserPetServed(DeployedAddresses.UserPetServed());

// The id of the pet that will be used for testing
 uint expectedPetId = 8;

//The expected owner of adopted pet is this contract
 address expectedAdopter = address(this);

// Testing the adopt() function
function testUserCanAdoptPet() public {
  uint returnedId = userPetServed.adopt(expectedPetId);

  Assert.equal(returnedId, expectedPetId, "Adoption of the expected pet should match what is returned.");
}

// Testing retrieval of a single pet's owner
function testPetServed() public {
  uint returnPetServed = userPetServed.petServed();

  Assert.equal(returnPetServed, 1, "petServed should be this contract");
}

function testUserServed() public {
  uint returnUserServed = userPetServed.userServed();
  Assert.equal(returnUserServed, 1, "userServed should be this contract");
}

// Testing retrieval of all pet owners
function testAdoptOneMorePetForSameUser() public {
  uint returnedId = userPetServed.adopt(7);
  uint returnPetServed = userPetServed.petServed();
  uint returnUserServed = userPetServed.userServed();

  Assert.equal(returnedId, 7, "Adoption of the expected pet should match what is returned.");
  Assert.equal(returnPetServed, 2, "petServed should be this contract");
  Assert.equal(returnUserServed, 1, "userServed should be this contract");
}


}