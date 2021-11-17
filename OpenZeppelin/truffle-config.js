require("dotenv").config({ path: "../.env" });

const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    neonlabs: {
      provider: () => {
        "use strict";

        // console.log("=============================");
        // console.log(process.env.PRIVATE_KEY);
        // console.log(process.env.PROXY_URL);
        // console.log(process.env.ADDRESS_FROM);
        // console.log(process.env.ADDRESS_TO);

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
      timeoutBlocks: 100,

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
