import { suite, test } from "@testdeck/mocha";
import { epic, feature } from "allure-decorators";
import { expect } from "chai";
import { Eth } from "ethjs";
import { HttpProvider } from "ethjs-provider-http";
import { Config } from "../../../config/default";

const EpicName = "ethjs";
const SuiteName = EpicName;

const EthObjectShouldNotBeNull = "Eth object should not be null";
const BlockShouldBeGreaterThan0 = "Block should be greater than 0";
const EtherValueShouldBeGreaterThan0 = "Ether value should be greater than 0";
// https://github.com/ethjs/ethjs
@suite(SuiteName)
class EthJsTests {
  @epic(EpicName)
  @feature("Connection test")
  @test
  public async test01() {
    const eth = new Eth(new Eth.HttpProvider(Config.url));
    console.log(`eth = ${eth}`);
    expect(eth, EthObjectShouldNotBeNull).to.not.be.null;

    eth.getBlockByNumber(45300, (err, block) => {
      // result null { ...block data... }
      console.log(`Block = ${block}`);
      expect(block, BlockShouldBeGreaterThan0).to.be.greaterThan(0);
    });

    const etherValue = Eth.toWei(72, "ether");
    console.log(`Ether value = ${etherValue}`);
    expect(etherValue, EtherValueShouldBeGreaterThan0).to.be.greaterThan(0);

    // result <BN ...>

    const tokenABI = [
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
      },
    ];

    const token = eth
      .contract(tokenABI)
      .at("0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78");

    token.totalSupply().then((totalSupply) => {
      // result <BN ...>  4500000
      console.log(`Total supply = ${totalSupply}`);
      expect(
        totalSupply,
        "Total supply should be greater than 0"
      ).to.be.greaterThan(0);
    });
  }
}
