/// ENVVAR
// - CI:                output gas report to file instead of stdout
// - COVERAGE:          enable coverage report
// - ENABLE_GAS_REPORT: enable gas report
// - COMPILE_MODE:      production modes enables optimizations (default: development)
// - COMPILE_VERSION:   compiler version (default: 0.8.3)
// - COINMARKETCAP:     coinmarkercat api key for USD value in gas report

require("dotenv").config({ path: "../.env" });
const Web3 = require("web3");
const axios = require('axios').default;

const fs = require('fs');
const path = require('path');
const argv = require('yargs/yargs')()
  .env('')
  .options({
    ci: {
      type: 'boolean',
      default: false,
    },
    coverage: {
      type: 'boolean',
      default: false,
    },
    gas: {
      alias: 'enableGasReport',
      type: 'boolean',
      default: false,
    },
    mode: {
      alias: 'compileMode',
      type: 'string',
      choices: ['production', 'development'],
      default: 'development',
    },
    compiler: {
      alias: 'compileVersion',
      type: 'string',
      default: '0.8.3',
    },
    coinmarketcap: {
      alias: 'coinmarketcapApiKey',
      type: 'string',
    },
  })
  .argv;

require('@nomiclabs/hardhat-truffle5');

if (argv.enableGasReport) {
  require('hardhat-gas-reporter');
}

for (const f of fs.readdirSync(path.join(__dirname, 'hardhat'))) {
  require(path.join(__dirname, 'hardhat', f));
}

const withOptimizations = argv.enableGasReport || argv.compileMode === 'production';

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

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: argv.compiler,
    settings: {
      optimizer: {
        enabled: withOptimizations,
        runs: 200,
      },
    },
  },
  defaultNetwork: "neonlabs",
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations,
    },
    neonlabs: {
      url: process.env.PROXY_URL,
      accounts: privateKeys,
      from: process.env.ADDRESS_FROM,
      network_id: process.env.NETWORK_ID,
      gas: 3000000,
      gasPrice: 1000000000,
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations,
    },
  },
  gasReporter: {
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    coinmarketcap: argv.coinmarketcap,
  },
  mocha: {
    timeout: 1000000000,
    reporter: 'mocha-multi-reporters',
    reporterOption: {
      configFile: '../reporterConfig.json',
      // url: process.env.PROXY_URL,
    },
    diff: true,
  },
};

if (argv.coverage) {
  require('solidity-coverage');
  module.exports.networks.hardhat.initialBaseFeePerGas = 0;
}
