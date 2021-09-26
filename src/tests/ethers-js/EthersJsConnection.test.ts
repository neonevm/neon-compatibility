import { suite, test } from "@testdeck/mocha";
import { epic, feature } from "allure-decorators";
import { expect } from "chai";
import { Config } from "../../../config/default";
import { ConnectionManager } from "../../helpers/ethers-js/ConnectionManager";
import { DataRetrieval } from "../../helpers/ethers-js/DataRetrieval";

const JsonRpcProviderShouldNotBeNull = "JsonRpcProvider should not be null";
const BlockNumberShouldBeNonZero = "Block number should be non-zero";
@suite("Ethers.js")
class EthersJsConnectionTests {
  @epic("Ethers.js")
  @feature("Connection test")
  @test
  public async shouldConnectViaEthersJs() {
    const provider = new ConnectionManager().connectToJsonRpc(Config.url);
    console.log(`Provider: ${provider}`);
    expect(provider, JsonRpcProviderShouldNotBeNull).to.not.be.null;
    expect(provider.connection.url).to.be.equal(Config.url);
    const blockNumber = await new DataRetrieval().getBlockNumber(provider);
    console.log(`Current block number = ${blockNumber}`);
    expect(blockNumber, BlockNumberShouldBeNonZero).to.be.greaterThan(0);
  }

  public before() {}

  public after() {}
}
