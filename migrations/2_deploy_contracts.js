var Adoption = artifacts.require("Adoption");
var UserPetServed = artifacts.require("UserPetServed");
var UserTrack = artifacts.require("UserTrack");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(UserPetServed);
  deployer.deploy(UserTrack);
};