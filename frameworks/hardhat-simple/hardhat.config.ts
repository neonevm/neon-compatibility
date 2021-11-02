import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import { HttpNetworkConfig } from 'hardhat/types/config';
import { int } from 'hardhat/internal/core/params/argumentTypes';
const Web3 = require('web3');
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
// import('hardhat/config').HardhatUserConfig

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROXY_URL));
const account01 = web3.eth.accounts.create();
process.env.ADDRESS_FROM = account01.address;
process.env.PRIVATE_KEY = account01.privateKey;
const account02 = web3.eth.accounts.create();
process.env.ADDRESS_TO = account02.address;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const neonlabs: HttpNetworkConfig = {
  /*
    chainId?: number;
    from?: string;
    gas: "auto" | number;
    gasPrice: "auto" | number;
    gasMultiplier: number;
    url: string;
    timeout: number;
    httpHeaders: { [name: string]: string };
    accounts: HttpNetworkAccountsConfig;
        */
  url: process.env.PROXY_URL?.toString() ?? '',
  chainId: parseInt(process.env.NETWORK_ID?.toString() ?? ''),
  from: process.env.ADDRESS_FROM,
  accounts: [process.env.PRIVATE_KEY?.toString() ?? ''],
  gas: 'auto',
  gasPrice: 'auto',
  gasMultiplier: 1,
  httpHeaders: {},

  /*
    gasMultiplier: number;
    url: string;
    timeout: number;
    httpHeaders: { [name: string]: string };
    accounts: HttpNetworkAccountsConfig;
              */
  timeout: 100000

  /*
  url: The url of the node. This argument is required for custom networks.
  chainId: An optional number, used to validate the network Hardhat connects to. If not present, this validation is omitted.
  from: The address to use as default sender. If not present the first account of the node is used.
  gas: Its value should be "auto" or a number. If a number is used, it will be the gas limit used by default in every transaction. If "auto" is used, the gas limit will be automatically estimated. Default value: "auto".
  gasPrice: Its value should be "auto" or a number. This parameter behaves like gas. Default value: "auto".
  gasMultiplier: A number used to multiply the results of gas estimation to give it some slack due to the uncertainty of the estimation process. Default value: 1.
  accounts: This field controls which accounts Hardhat uses. It can use the node's accounts (by setting it to "remote"), a list of local accounts (by setting it to an array of hex-encoded private keys), or use an HD Wallet. Default value: "remote".
  httpHeaders: You can use this field to set extra HTTP Headers to be used when making JSON-RPC requests. It accepts a JavaScript object which maps header names to their values. Default value: undefined.
  timeout: Timeout in ms for requests sent to the JSON-RPC server. If the request takes longer than this, it will be cancelled. Default value: 20000.
               */
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.4',
  defaultNetwork: 'neonlabs',
  networks: {
    // hardhat: {},
    neonlabs: neonlabs
  },
  mocha: {
    timeout: 1000000000,
    reporter: 'mocha-multi-reporters',
    reporterOption: {
      configFile: '../../reporterConfig.json'
    },
    diff: true
  }
};
