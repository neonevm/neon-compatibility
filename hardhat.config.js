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

const getStringValue = (input) => {
  return input === undefined ? '' : input;
};

const getBooleanValue = (input) => {
  return input === undefined || input === 'false' || input === 'FALSE'
    ? false
    : input === 'true' || input === 'TRUE'
    ? true
    : false;
};

const Config = {
  baseUrl: getStringValue(process.env.PROXY_URL).replace('/solana', ''),
  addressFrom: getStringValue(process.env.ADDRESS_FROM),
  addressTo: getStringValue(process.env.ADDRESS_TO),
  privateKey: getStringValue(process.env.PRIVATE_KEY),
  faucetQuotient: Number.parseInt(getStringValue(process.env.FAUCET_QUOTIENT)),
  faucetUrl: getStringValue(process.env.FAUCET_URL),
  useFaucet: getBooleanValue(process.env.USE_FAUCET),
  network: getStringValue(process.env.NETWORK_NAME),
  networkId: getStringValue(process.env.NETWORK_ID),
  proxyUrl: getStringValue(process.env.PROXY_URL),
  solanaExplorer: getStringValue(process.env.SOLANA_EXPLORER),
  solanaUrl: getStringValue(process.env.SOLANA_URL),
  usersNumber: getStringValue(process.env.USERS_NUMBER)
};

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
  if (!Config.useFaucet) {
    console.log(`Skipping faucet request: USE_FAUCET set to false`);
    return;
  }
  console.log('Requesting faucet...');
  const data = { amount: amount, wallet: wallet };
  console.log(`URL: ${Config.faucetUrl}`);
  if (Config.faucetUrl.length === 0) {
    console.log('Unable to request faucet: FAUCET_URL is empty');
    return;
  }
  console.log(`Wallet = ${data.wallet}, amount = ${data.amount}`);
  const result = await axios.post(Config.faucetUrl, data);
  console.log(result);
};

const getBalance = async (address) => await web3.eth.getBalance(address);

const requestFaucetAndGetBalance = async (address, amount) => {
  await requestFaucet(address, amount);
  await getBalance(address);
};

const REQUEST_AMOUNT = 10;

const web3 = new Web3(new Web3.providers.HttpProvider(Config.proxyUrl, 3000000));
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

const privateKeys = Array.from(Array(Config.usersNumber), (_, x) => {
  const acc = web3.eth.accounts.create();
  (async (address, amount) => requestFaucetAndGetBalance(address, amount))(
    acc.address,
    REQUEST_AMOUNT
  );
  return acc.privateKey;
});
privateKeys.unshift(Config.privateKey);

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
  console.log(`main private key = ${Config.privateKey}`);
  console.log(`account keys = ${privateKeys}`);
  console.log(
    '=============================================================================='
  );
})(Config.addressFrom, Config.addressTo);

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
      url: Config.proxyUrl,
      accounts: privateKeys,
      from: Config.addressFrom,
      to: Config.addressTo,
      network_id: parseInt(Config.networkId),
      // chainId: null !== Config.networkId ? parseInt(Config.networkId) : 0,
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
