App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        petTemplate.find('.btn-owner').attr('data-id', data[i].id);
        petsRow.append(petTemplate.html());
      }
    });

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
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });
    $.getJSON('UserPetServed.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var UserPetServedArtifact = data;
      App.contracts.UserPetServed = TruffleContract(UserPetServedArtifact);
    
      // Set the provider for our contract
      App.contracts.UserPetServed.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.updateUserServed();
    });
    $.getJSON('UserTrack.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var UserTrackArtifact = data;
      App.contracts.UserTrack = TruffleContract(UserTrackArtifact);
    
      // Set the provider for our contract
      App.contracts.UserTrack.setProvider(App.web3Provider);
    
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '.btn-owner', App.handleOwner);
  },

  handleOwner: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
     console.log(petId)
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
    
        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopters.call(petId);
      }).then(function(result) {
        alert("owner is "+ result);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },
  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
    
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('.btn-adopt').text('Success').attr('disabled', true);
          $('.panel-pet').eq(i).find('.btn-owner').attr('disabled', false);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  updateUserServed: function(adopters, account) {
    var adoptionInstance;

    App.contracts.UserPetServed.deployed().then(function(instance) {
      userPetServedInstance = instance;
    
      return userPetServedInstance.petServed.call();
    }).then(function(petServed) {
      console.log(petServed)
      $('#pet-served').text(petServed)
      
    }).catch(function(err) {
      console.log(err.message);
    });

     App.contracts.UserPetServed.deployed().then(function(instance) {
      userPetServedInstance = instance;
    
      return userPetServedInstance.userServed.call();
    }).then(function(userServed) {
      console.log(userServed)
      $('#user-served').text(userServed)
      
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
      App.contracts.UserPetServed.deployed().then(function(instance) {
        userPetServedInstance = instance;
    
        // Execute adopt as a transaction by sending account
        userPetServedInstance.adopt(petId, {from: account});
      }).catch(function(err) {
        console.log(err.message);
      });
      App.contracts.UserTrack.deployed().then(function(instance) {
        userTrackInstance = instance;
    
        // Execute adopt as a transaction by sending account
        userTrackInstance.adopt(petId, {from: account});
      }).catch(function(err) {
        console.log(err.message);
      });
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
    
        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).then(function(result) {
        return App.updateUserServed();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
