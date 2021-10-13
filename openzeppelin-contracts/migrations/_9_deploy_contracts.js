const ERC721Mock = artifacts.require('ERC721Mock');
const ERC721EnumerableMock = artifacts.require('ERC721EnumerableMock');
const ERC721BurnableMock = artifacts.require('ERC721BurnableMock');
const ERC721PausableMock = artifacts.require('ERC721PausableMock');
const ERC721URIStorageMock = artifacts.require('ERC721URIStorageMock');
const ERC721PresetMinterPauserAutoId = artifacts.require('ERC721PresetMinterPauserAutoId');
const ERC721Holder = artifacts.require('ERC721Holder');

const name = "Mistery NFT";
const symbol = "MNFT";
const baseTokenURI = "1";

module.exports = function (deployer) {
  deployer.deploy(ERC721Mock, name, symbol);
  deployer.deploy(ERC721EnumerableMock, name, symbol);
  deployer.deploy(ERC721BurnableMock, name, symbol);
  deployer.deploy(ERC721PausableMock, name, symbol);
  deployer.deploy(ERC721URIStorageMock, name, symbol);
  deployer.deploy(ERC721PresetMinterPauserAutoId, name, symbol, baseTokenURI);
  deployer.deploy(ERC721Holder);
};
