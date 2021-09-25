import { suite, test } from "@testdeck/mocha";
import { epic, feature } from "allure-decorators";
import { ethers } from "ethers";
import { Config } from "../../../config/default";

@suite
class EthersJsConnectionTests {
  @epic("Ethers.js")
  @feature("Connection test")
  @test
  public shouldConnectViaEthersJs() {
    const provider = new ethers.providers.JsonRpcProvider(Config.url);
    console.log(provider);
  }

  public before(){

  }

  public after(){

  }
}
