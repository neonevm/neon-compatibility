import { suite, test, skip } from '@testdeck/mocha';
import { epic, feature } from 'allure-decorators';
// import * as Web3 from 'web3';
// const Web3 = require("web3");
import Web3 from 'web3';
import { Account } from 'web3-core';
import { OpenSeaPort, Network } from 'opensea-js';
import { Networks } from '../../helpers/common/networks';

const EpicName = 'Opensea.js';
const SuiteName = EpicName;

@suite(SuiteName)
class OpenseaJSTests {
  @epic(EpicName)
  @feature('Account test')
  @test
  public async shouldConnectViaOpenseaJS() {
    // This example provider won't let you make transactions, only read-only calls:
    const provider = new Web3.providers.HttpProvider(
      process.env.PROXY_URL?.toString() ?? ''
    );

    const seaport = new OpenSeaPort(provider, {
      networkName: selectNetwork(process.env.NETWORK_NAME)
      //   Network.Main
      // NetworkPlus.TESTNET
    });
  }
}

const NetworkPlus = {
  ...Network,
  TESTNET: Networks.testnet,
  DEVNET: Networks.devnet,
  INTERNAL_TESTNET: Networks.internal_testnet
};

const selectNetwork = (networkName: string | undefined) => {
  switch (networkName) {
    case Networks.devnet:
      return NetworkPlus.DEVNET;
    case Networks.testnet:
      return NetworkPlus.TESTNET;
    case Networks.internal_testnet:
      return NetworkPlus.INTERNAL_TESTNET;
    default:
      return NetworkPlus.INTERNAL_TESTNET;
  }
};
