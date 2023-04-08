pragma solidity ^0.5.0;

contract UserTrack {

	struct pet {
        uint id;
        string name;
        string breed;
        uint age;
        string loc;
        string img;
    }
    struct user_pets {
        uint petCount;
        mapping (unit => pets)  pets_list;
    }

	mapping (address => pet_list) public user_list;

	// Adopting a pet
	function adoptPet(string memory _name, string memory _breed, uint _age, string memory _loc, string memory _img) public returns (uint) {

	  user_list[msg.sender].petCount ++；

	  unit petCount = user_list[msg.sender].petCount;

	  user_list[msg.sender].pets_list[petCount] = pet(petCount, _name, _breed, _age, _loc, _img);

	  return petCount;
	}

}