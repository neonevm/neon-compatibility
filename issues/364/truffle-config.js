require("dotenv").config({ path: "../../.env" });

const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROXY_URL));
// const account01 = web3.eth.accounts.create();
// process.env.ADDRESS_FROM = account01.address;
// process.env.PRIVATE_KEY = account01.privateKey;

module.exports = {
  networks: {
    neonlabs: {
      provider: () => {
        "use strict";
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          process.env.PROXY_URL
        );
      },
      from: process.env.ADDRESS_FROM,
      to: process.env.ADDRESS_TO,
      network_id: process.env.NETWORK_ID,
      gas: 3000000,
      gasPrice: 1000000000,
      timeoutBlocks: 100000,

      // gas
      // gasPrice
      // confirmations: - number of confirmations to wait between deployments (default: 0)
      // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000,
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
