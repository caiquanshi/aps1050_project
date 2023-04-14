App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    

    return await App.initWeb3();
  },

  initWeb3: async function() {

    // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

initContract: function() {
  $.getJSON('UserTrack.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var UserTrackArtifact = data;
    App.contracts.UserTrack = TruffleContract(UserTrackArtifact);
  
    // Set the provider for our contract
    App.contracts.UserTrack.setProvider(App.web3Provider);
    return App.updateUserTrack();
  });
},

updateUserTrack: function() {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
      
      App.contracts.UserTrack.deployed().then(async function(instance) {
      userTrackInstance = instance;
      var petCount = await userTrackInstance.getAdoptersPetCount({from: account});
      var petsList = await userTrackInstance.getAdoptersPets({from: account});   
      // console.log(petCount)  
      return {petCount, petsList};
    }).then(function(petCount_petsList) {
      var petCount = petCount_petsList.petCount
      var petsList = petCount_petsList.petsList
      console.log(petsList)
      $.getJSON('../pets.json', function(data) {
        var petsRow = $('#petsRow');
        var petTemplate = $('#petTemplate'); 
        for (i = 0; i < petCount; i ++) {
          var petId = petsList[i]
          console.log(petId)  
          petTemplate.find('.panel-title').text(data[petId].name);
          petTemplate.find('img').attr('src', data[petId].picture);
          petTemplate.find('.pet-breed').text(data[petId].breed);
          petTemplate.find('.pet-age').text(data[petId].age);
          petTemplate.find('.pet-location').text(data[petId].location); 

          petsRow.append(petTemplate.html());
        }
      });
      
    }).catch(function(err) {
      console.log(err.message);
    });
    });
  }

}

$(function() {
  $(window).load(function() {
    App.init();
  });
});