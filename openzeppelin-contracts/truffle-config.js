require("dotenv").config({ path: "../.env" });
const Web3 = require("web3");
const axios = require('axios').default;
const HDWalletProvider = require("@truffle/hdwallet-provider");

process.env.UV_THREADPOOL_SIZE = 128;

n_maxLs = 100;
EventEmitter = require("events").EventEmitter;
EventEmitter.prototype._maxListeners = n_maxLs;
// var _fnNull = function(e){if(program && program.verbose)console.log(e)};
// process.on('uncaughtException', _fnNull);
// process.on('unhandledRejection', _fnNull);

EventEmitter.defaultMaxListeners = n_maxLs;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROXY_URL));
const account01 = web3.eth.accounts.create();
process.env.ADDRESS_FROM = account01.address;
process.env.PRIVATE_KEY = account01.privateKey;
const account02 = web3.eth.accounts.create();
process.env.ADDRESS_TO = account02.address;

const privateKeys = [process.env.PRIVATE_KEY,
                     web3.eth.accounts.create().privateKey,
                     web3.eth.accounts.create().privateKey,
                     web3.eth.accounts.create().privateKey,
                     web3.eth.accounts.create().privateKey,
                     web3.eth.accounts.create().privateKey,
                     web3.eth.accounts.create().privateKey,
                     web3.eth.accounts.create().privateKey];

// const faucetUrl = process.env.PROXY_URL.replace("/solana", "/request_erc20_tokens");
const faucetUrl = process.env.FAUCET_URL
console.log(faucetUrl);
const requestFaucet = (address, amount) => axios.post(faucetUrl, { wallet: address, amount: amount })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// TODO: temporarily commented out, enable it when the faucet works
/*
requestFaucet(account01.address, 10);
requestFaucet(account02.address, 10);
*/

/*
let initialBalance = 10 * Config.faucetQuotient;
const provider = new ConnectionManager().connectToJsonRpc(Config.url);
logger.notice(`Provider: ${provider}`);
const randomWallet = ethers.Wallet.createRandom();
logger.notice(`Random wallet = ${randomWallet.address}`);
const wallet = randomWallet.connect(provider);
logger.notice(`Random wallet connected = ${wallet.provider}`);
await requestFaucet(wallet.address, initialBalance);

const balance = await wallet.getBalance();
logger.notice(`Balance = ${balance.toString()}`);
*/

module.exports = {
  networks: {
    neonlabs: {
      provider: () => {
        "use strict";

        console.log("=============================");
        /*
        console.log(`private key = ${process.env.PRIVATE_KEY}`);
        */
        console.log(`URL = ${process.env.PROXY_URL}`);
        /*
        console.log(`address from = ${process.env.ADDRESS_FROM}`);
        console.log(`address to = ${process.env.ADDRESS_TO}`);
        */

        return new HDWalletProvider(
          privateKeys,
          process.env.PROXY_URL
        );
      },
      from: process.env.ADDRESS_FROM,
      to: process.env.ADDRESS_TO,
      network_id: process.env.NETWORK_ID,
      gas: 3000000,
      gasPrice: 1000000000,
      timeoutBlocks: 2000,
      skipDryRun: true,
      networkCheckTimeout: 10000000,
      confirmations: 10,
      // experimental feature
      disableConfirmationListener: true,

      // gas
      // gasPrice
      // confirmations: - number of confirmations to wait between deployments (default: 0)
      // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 1000000000,
    reporter: 'mocha-multi-reporters',
    reporterOption: {
      configFile: '../reporterConfig.json',
    },
    diff: true,
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
