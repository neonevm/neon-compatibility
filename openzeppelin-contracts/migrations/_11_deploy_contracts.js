const ERC1155Mock = artifacts.require('ERC1155Mock');
const ERC1155ReceiverMock = artifacts.require('ERC1155ReceiverMock');
const ERC1155BurnableMock = artifacts.require('ERC1155BurnableMock');
const ERC1155PausableMock = artifacts.require('ERC1155PausableMock');
const ERC1155SupplyMock = artifacts.require('ERC1155SupplyMock');
const ERC1155PresetMinterPauser = artifacts.require('ERC1155PresetMinterPauser');
const ERC1155Holder = artifacts.require('ERC1155Holder');

const uri = "/12";
const recRetval = 2;
const recReverts = true;
const batRetval = 3;
const batReverts = true;

module.exports = function (deployer) {
  deployer.deploy(ERC1155Mock, uri);
  deployer.deploy(ERC1155ReceiverMock, recRetval, recReverts, batRetval, batReverts);
  deployer.deploy(ERC1155ReceiverMock, uri);
  deployer.deploy(ERC1155BurnableMock, uri);
  deployer.deploy(ERC1155PausableMock, uri);
  deployer.deploy(ERC1155SupplyMock, uri);
  deployer.deploy(ERC1155PresetMinterPauser, uri);
  deployer.deploy(ERC1155Holder);
};
