App = {

    contracts: {},
    web3Provider: null,             // Web3 provider
    url: 'http://localhost:7545',   // Url for web3
    account: '0x0',                 // current ethereum account

    init: function() {
        return App.initWeb3();
    },

    // Initialize Web3 
    initWeb3: async function() {
   
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      var arr = null;
      arr = await window.ethereum.enable(); //arr is the array of accounts, arr[0] the first account
      if(arr!==null){web3 = new Web3(App.web3Provider)} else{console.log("metamask user did not enable the accounts")}; //press F12 to see the console in the browser
      return App.initContract();
    }
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
      return App.initContract();
    }
  },       
       

    // Upload the contract's abstractions
    initContract: function() {

        // Get current account
        web3.eth.getCoinbase(function(err, account) {
            if(err == null) {
                App.account = account;
                console.log(account); //press F12 to see the console in the browser
                $("#accountId").html("Account:" + account);
            }
        });

        // Load contract's abstractions
       $.getJSON("Contract.json", function(mycontract) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.Contract = TruffleContract(mycontract);
            // Connect provider to interact with contract
            App.contracts.Contract.setProvider(App.web3Provider);
            return App.listenForEvents();
       });   
    },


    // Write an event listener
    listenForEvents: function() {

        App.contracts.Contract.deployed().then(async (instance) => {
                console.log(instance.address); //press F12 to see the console in the browser
                // click is the Solidity event
                instance.click().on('data', function (event) {
                    $("#eventId").html("Event catched!");
                    console.log("Event catched"); //press F12 to see the console in the browser
                    console.log(event); //press F12 to see the console in the browser
                    // If event has parameters: event.returnValues.*paramName*
            });
        });

        return App.render();
    },

    // Get a value from the smart contract
    render: function() {

        App.contracts.Contract.deployed().then(async(instance) =>{

            const v = await instance.value(); // Solidity uint are Js BigNumbers 
            console.log(v.toNumber()); //press F12 to see the console in the browser
            $("#valueId").html("" + v);
        });
    },

    // Call a function of a smart contract
        // The function send an event that triggers a transaction:: Metamask pops up ask the user to confirm the transaction
    pressClick: async function() {

        App.contracts.Contract.deployed().then(async(instance) =>{
            var receipt = await instance.pressClick({from: App.account});
            console.log("value_bis is: ", receipt.logs[0].args.value_bis.toNumber()); //this line is executed if you comment out the event listener
            //note: if the event is caught with the event listener: instance.click().on('data', function (event), then
            //the javascript execution cursor never reaches the receipt or the console log line under it
        });
    } 
}

// Call init whenever the window loads
$(function() {
    $(window).on('load', function () {
        App.init();
    });
});