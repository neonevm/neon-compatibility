/// ENVVAR
// - CI:                output gas report to file instead of stdout
// - COVERAGE:          enable coverage report
// - ENABLE_GAS_REPORT: enable gas report
// - COMPILE_MODE:      production modes enables optimizations (default: development)
// - COMPILE_VERSION:   compiler version (default: 0.8.3)
// - COINMARKETCAP:     coinmarkercat api key for USD value in gas report

require("dotenv").config({ path: "../.env" });
const Web3 = require("web3");

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

const ACCOUNTS_NUMBER = parseInt(process.env.USERS_NUMBER);

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROXY_URL));
const account01 = web3.eth.accounts.create();
process.env.ADDRESS_FROM = account01.address;
process.env.PRIVATE_KEY = account01.privateKey;
(async () => await web3.eth.getBalance(account01.address))();
const account02 = web3.eth.accounts.create();
process.env.ADDRESS_TO = account02.address;
(async () => await web3.eth.getBalance(account02.address))();

const privateKeys = Array.from(Array(ACCOUNTS_NUMBER), (_, x) => {
  const acc = web3.eth.accounts.create();
  (async (address) => await web3.eth.getBalance(address))(acc.address);
  return acc.privateKey;
});
privateKeys.unshift(process.env.PRIVATE_KEY);

console.log("========================== Reading Hardhat config =============================");
(async (addressFrom, addressTo) => {
  console.log(`address from = ${addressFrom} balance=`, await web3.eth.getBalance(addressFrom));
  console.log(`address to = ${addressTo}  balance=`, await web3.eth.getBalance(addressTo));
  console.log(`main private key = ${process.env.PRIVATE_KEY}`);
  console.log(`account keys = ${privateKeys}`);
  console.log("==============================================================================");
})(process.env.ADDRESS_FROM, process.env.ADDRESS_TO);

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
      to: process.env.ADDRESS_TO,
      network_id: parseInt(process.env.NETWORK_ID),
      // chainId: null !== process.env.NETWORK_ID ? parseInt(process.env.NETWORK_ID) : 0,
      gas: 3000000,
      gasPrice: 1000000000,
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations,
      timeout: 100000,
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
    },
    diff: true,
  },
};

if (argv.coverage) {
  require('solidity-coverage');
  module.exports.networks.hardhat.initialBaseFeePerGas = 0;
}
