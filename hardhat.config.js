/// ENVVAR
// - CI:                output gas report to file instead of stdout
// - COVERAGE:          enable coverage report
// - ENABLE_GAS_REPORT: enable gas report
// - COMPILE_MODE:      production modes enables optimizations (default: development)
// - COMPILE_VERSION:   compiler version (default: 0.8.3)
// - COINMARKETCAP:     coinmarkercat api key for USD value in gas report

require('dotenv').config({ path: '../.env' });
const Web3 = require('web3');
const axios = require('axios');

const fs = require('fs');
const path = require('path');
const argv = require('yargs/yargs')()
  .env('')
  .options({
    ci: {
      type: 'boolean',
      default: false
    },
    coverage: {
      type: 'boolean',
      default: false
    },
    gas: {
      alias: 'enableGasReport',
      type: 'boolean',
      default: false
    },
    mode: {
      alias: 'compileMode',
      type: 'string',
      choices: ['production', 'development'],
      default: 'development'
    },
    compiler: {
      alias: 'compileVersion',
      type: 'string',
      default: '0.8.10'
    },
    coinmarketcap: {
      alias: 'coinmarketcapApiKey',
      type: 'string'
    }
  }).argv;

require('@nomiclabs/hardhat-truffle5');

if (argv.enableGasReport) {
  require('hardhat-gas-reporter');
}

for (const f of fs.readdirSync(path.join(__dirname, 'hardhat'))) {
  require(path.join(__dirname, 'hardhat', f));
}

const withOptimizations =
  argv.enableGasReport || argv.compileMode === 'production';

const requestFaucet = async (wallet, amount) => {
  // TODO: create a wrapper
  if (process.env.USE_FAUCET !== 'true') {
    console.log('Skipping faucet request');
    return;
  }
  console.log('Requesting faucet...');
  const data = { amount: amount, wallet: wallet };
  const faucetUrl = process.env.FAUCET_URL;
  console.log(`URL: ${faucetUrl}`);
  if (faucetUrl.length === 0) {
    console.log('Unable to request faucet');
    return;
  }
  console.log(`Wallet = ${data.wallet}, amount = ${data.amount}`);
  const result = await axios.post(faucetUrl, data);
  console.log(result);
};

const getBalance = async (address) => await web3.eth.getBalance(address);

const requestFaucetAndGetBalance = async (address, amount) => {
  await requestFaucet(address, amount);
  await getBalance(address);
};

const ACCOUNTS_NUMBER = parseInt(process.env.USERS_NUMBER);
const REQUEST_AMOUNT = 10;

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.PROXY_URL, 3000000)
);
const account01 = web3.eth.accounts.create();
process.env.ADDRESS_FROM = account01.address;
process.env.PRIVATE_KEY = account01.privateKey;
(async (address, amount) => requestFaucetAndGetBalance(address, amount))(
  account01.address,
  REQUEST_AMOUNT
);
const account02 = web3.eth.accounts.create();
process.env.ADDRESS_TO = account02.address;
(async (address, amount) => requestFaucetAndGetBalance(address, amount))(
  account02.address,
  REQUEST_AMOUNT
);

const privateKeys = Array.from(Array(ACCOUNTS_NUMBER), (_, x) => {
  const acc = web3.eth.accounts.create();
  (async (address, amount) => requestFaucetAndGetBalance(address, amount))(
    acc.address,
    REQUEST_AMOUNT
  );
  return acc.privateKey;
});
privateKeys.unshift(process.env.PRIVATE_KEY);

console.log(
  '========================== Reading Hardhat config ============================='
);
(async (addressFrom, addressTo) => {
  console.log(
    `address from = ${addressFrom} balance=`,
    await web3.eth.getBalance(addressFrom)
  );
  console.log(
    `address to = ${addressTo}  balance=`,
    await web3.eth.getBalance(addressTo)
  );
  console.log(`main private key = ${process.env.PRIVATE_KEY}`);
  console.log(`account keys = ${privateKeys}`);
  console.log(
    '=============================================================================='
  );
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
        runs: 200
      }
    }
  },
  defaultNetwork: 'neonlabs',
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations
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
      timeout: 1000000,
      isFork: true
    }
  },
  gasReporter: {
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    coinmarketcap: argv.coinmarketcap
  },
  mocha: {
    timeout: 1000000000,
    reporter: 'mocha-multi-reporters',
    reporterOption: {
      configFile: '../reporterConfig.json'
    },
    diff: true
  }
};

if (argv.coverage) {
  require('solidity-coverage');
  module.exports.networks.hardhat.initialBaseFeePerGas = 0;
}
