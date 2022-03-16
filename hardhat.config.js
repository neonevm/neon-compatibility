/// ENVVAR
// - CI:                output gas report to file instead of stdout
// - COVERAGE:          enable coverage report
// - ENABLE_GAS_REPORT: enable gas report
// - COMPILE_MODE:      production modes enables optimizations (default: development)
// - COMPILE_VERSION:   compiler version (default: 0.8.3)
// - COINMARKETCAP:     coinmarkercat api key for USD value in gas report

require('dotenv').config({ path: '../.env' });
const Web3 = require('web3');

const getStringValue = (input) => {
  return input === undefined ? '' : input;
};

const getArrayValue = (input) => {
  return input === undefined ? [] : String(input).split(',')
}

const Config = {
  network: getStringValue(process.env.NETWORK_NAME),
  networkId: getStringValue(process.env.NETWORK_ID),
  proxyUrl: getStringValue(process.env.PROXY_URL),
  privateKeys: getArrayValue(process.env.PRIVATE_KEYS)
};

const web3 = new Web3(
  new Web3.providers.HttpProvider(Config.proxyUrl, 180000)
);

if (Config.privateKeys.length > 0){
  process.env.PRIVATE_KEY = Config.privateKeys[0];
  process.env.ADDRESS_FROM = web3.eth.accounts.privateKeyToAccount(Config.privateKeys[0]).address;
  process.env.ADDRESS_TO = web3.eth.accounts.privateKeyToAccount(Config.privateKeys[1]).address;
} else {
  process.env.PRIVATE_KEY = "";
  process.env.ADDRESS_FROM = "";
  process.env.ADDRESS_TO = "";
}

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
      accounts: Config.privateKeys,
      from: process.env.ADDRESS_FROM,
      to: process.env.ADDRESS_TO,
      network_id: parseInt(Config.networkId),
      gas: "auto",
      gasPrice: "auto",
      allowUnlimitedContractSize: !withOptimizations,
      timeout: 180000,
      isFork: true
    }
  },
  gasReporter: {
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    coinmarketcap: argv.coinmarketcap
  },
  mocha: {
    timeout: 1800000,
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
