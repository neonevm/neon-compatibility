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
  requestAmount: Number.parseInt(getStringValue(process.env.REQUEST_AMOUNT)),
  faucetUrl: getStringValue(process.env.FAUCET_URL),
  useFaucet: getBooleanValue(process.env.USE_FAUCET),
  network: getStringValue(process.env.NETWORK_NAME),
  networkId: getStringValue(process.env.NETWORK_ID),
  proxyUrl: getStringValue(process.env.PROXY_URL),
  solanaExplorer: getStringValue(process.env.SOLANA_EXPLORER),
  solanaUrl: getStringValue(process.env.SOLANA_URL),
  usersNumber: Number.parseInt(getStringValue(process.env.USERS_NUMBER))
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


if (Config.useFaucet){
  console.log(`Use faucet: ${Config.faucetUrl}`)
} else {
  console.log(`Skipping faucet requests: USE_FAUCET set to false`);
}

const requestFaucet = async (wallet, amount) => {
  if (!Config.useFaucet) {
    return;
  }
  const data = { amount: amount, wallet: wallet };
  if (Config.faucetUrl.length === 0) {
    console.log('Unable to request faucet: FAUCET_URL is empty');
    return;
  }
  console.log(`Request '${data.amount}' tokens for wallet ${data.wallet} from faucet`);
    try {
      const resp = await axios.post(Config.faucetUrl, data);
      console.log(`Faucet response code: ${resp.status}`);
    } catch (err) {
      console.log(`Failed to send request to faucet: ${err.response.status} ${err.response.data}`);
    }
};

const getBalance = async (address) => {
    try {
      return await web3.eth.getBalance(address);
    } catch (e) {
      console.log(`Failed to get balance for wallet ${address}: ${e}`);
    }
}

const requestFaucetAndGetBalance = async (address, amount) => {
  await requestFaucet(address, amount);
  await getBalance(address);
};

const web3 = new Web3(
  new Web3.providers.HttpProvider(Config.proxyUrl, 3000000)
);
const account01 = web3.eth.accounts.create();
process.env.ADDRESS_FROM = account01.address;
process.env.PRIVATE_KEY = account01.privateKey;
(async (address, amount) => requestFaucetAndGetBalance(address, amount))(
  account01.address,
  Config.requestAmount
);
const account02 = web3.eth.accounts.create();
process.env.ADDRESS_TO = account02.address;
(async (address, amount) => requestFaucetAndGetBalance(address, amount))(
  account02.address,
  Config.requestAmount
);

const privateKeys = Array.from(Array(Config.usersNumber), (_, x) => {
  const acc = web3.eth.accounts.create();
  (async (address, amount) => requestFaucetAndGetBalance(address, amount))(
    acc.address,
    Config.requestAmount
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
    await getBalance(addressFrom)
  );
  console.log(
    `address to = ${addressTo}  balance=`,
    await getBalance(addressTo)
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
      url: Config.proxyUrl,
      accounts: privateKeys,
      from: process.env.ADDRESS_FROM,
      to: process.env.ADDRESS_TO,
      network_id: parseInt(Config.networkId),
      // chainId: null !== Config.networkId ? parseInt(Config.networkId) : 0,
      gas: "auto",
      gasPrice: "auto",
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
