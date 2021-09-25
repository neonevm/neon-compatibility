import { suite, test } from "@testdeck/mocha";
import { epic, feature } from "allure-decorators";
import { expect } from "chai";
import { ethers } from "ethers";
import { Config } from "../../../config/default";

@suite("Ethers.js")
class EthersJsConnectionTests {
  @epic("Ethers.js")
  @feature("Connection test")
  @test
  public shouldConnectViaEthersJs() {
    const provider = new ethers.providers.JsonRpcProvider(Config.url);
    console.log(provider);
    expect(provider, "JsonRpcProvider should not be null").to.not.be.null;
    expect(provider.connection.url).to.be.equal(Config.url);
  }

  public before() {}

  public after() {}
}
