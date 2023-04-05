# Skeleton of an Ethereum DApp

Basic nearly empty Ethereum Decentralized Application.
Truffle is used for the project initialization on the Smart Contract side and there are present a bunch of tools for the front end side such as boostrap and Truffle-Contract.

## Tools

- **NodeJS**
    - [lite-server](https://www.npmjs.com/package/lite-server) package, for development
- **Ethereum**, Solidity
    - [Truffle](https://truffleframework.com/truffle) framework, for smart contract compilation and migration
    - [Metamask](https://metamask.io/), Ethereum client
    - [Ganache](https://truffleframework.com/ganache), local blockchain for development
- **Front End**, Javascript
    - JQuery
    - Bootstrap
    - [Web3js](https://github.com/ethereum/web3.js/)
    - [Truffle-Contract](https://www.npmjs.com/package/@truffle/contract), nice smart contract's abstractions

## Install

Install nodeJS
Install Metamask and Ganache
`npm install -g truffle`
Clone this repository
`npm install` to install nodejs project dependencies (lite-server and truffle-contract)

## Setup workflow

- Run Ganache
- Login with Metamask and connect to local network (provided by Ganache)
- If any local accounts, import account from Ganache to Metamask (copy the private key to Metamask): the "imported" keyword should appear next to the account
- Reset account if already used (this action resets the nonce attached to the account: for example, perfoming transactions imcreases this nonce, so if you start Ganache again and you will use an already existing account with transaction history you will get error for bad nonce)
- `truffle compile`
- `truffle migrate --reset` (Ganache should be running)
- `npm run dev` to run lite-server (opens index.html)

