const ERC777Mock = artifacts.require('ERC777Mock');
const ERC777SenderRecipientMock = artifacts.require('ERC777SenderRecipientMock');
const ERC777PresetFixedSupply = artifacts.require('ERC777PresetFixedSupply');

const initialHolder = "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082";
const initialBalance = 10000;
const name = "Mistery FT";
const symbol = "MFT";
const defaultOperators = [
  "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082",
  "0xE88FA6b326602d3D9dF8628e122f49bF37E48a0E"
];

module.exports = function (deployer) {
  deployer.deploy(ERC777Mock, initialHolder, initialBalance, name, symbol, defaultOperators);
  deployer.deploy(ERC777SenderRecipientMock);
  deployer.deploy(ERC777PresetFixedSupply, name, symbol, defaultOperators);
};
