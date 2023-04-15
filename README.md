# Pet Shop Truffle Box


## Features Description
### Tracking Customers Served and Pets Adopted
We have implemented a system to keep track of the number of customers served and pets adopted. This data can provide valuable insights for the pet shop's operations, allowing them to better understand customer behavior and make informed business decisions.

### Managing Pet Ownership Records
We have created a system to keep track of which owner has which pet(s). This allows for efficient management of pet ownership records, ensuring accurate and transparent information about pet ownership within the DApp.

### Associating Pets with Owners
We have developed a system to associate pets with their respective owners. This ensures that each pet has a clear and verifiable owner, providing transparency and accountability in the pet adoption process.

### Purchasing PetShop Services and Products
We have integrated a feature that allows users to purchase PetShop services and products, such as pet vaccination, grooming, pet food, and pet toys, using cryptocurrency. This enables seamless and secure transactions within the DApp, providing a convenient and transparent way for users to access pet shop services and products.

### Donating Ether to the PetShop
We have implemented a unique functionality based on Web3Basics SendMeEther. This feature allows users to donate ether to the pet shop, and only the pet shop owner has the ability to withdraw the donated ether. This ensures transparency and accountability in the donation process, as well as providing a way for users to support the pet shop's operations.

### Restricting the hours of operation of the PetShop DApp to business hours
We have implemented another feature to restrict the hours of operation of the DApp to business hours only by adding a datetime check before loading the pets data. This feature allows the owner and the admin of the Petshop DApp to fully control the operation hours of the pet adoption functionality. From a user experience perspective, the user tracker, ownership review, market and donation functions are designed not to be affected by this feature.


## Dependencies
Node.js v16.0.0,
lite-server ^2.3.0,
Solidity ^0.5.0,
web3 v1.5.2,
Truffle v5.4.7,
Ganache 2.5.4,
Front end framework: JQuery

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```
2. Open Ganache.
   Open the Ganache, and click on QUICKSTART to obtain a new workspace!

3. Install MetaMask
   Install MetaMask, import the ganache wallet and setup the network port to 7545

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    truffle migrate --reset
    ```

5. Run the `liteserver` development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run dev
    ```
6. run test.
    ```javascript
    npm install chai-almost
    truffle test
    ``` 

