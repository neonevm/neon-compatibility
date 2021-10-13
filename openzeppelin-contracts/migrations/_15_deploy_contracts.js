const ERC165Mock = artifacts.require('ERC165Mock');
const ERC165CheckerMock = artifacts.require('ERC165CheckerMock');
const ERC165MissingData = artifacts.require('ERC165MissingData');
const ERC165NotSupported = artifacts.require('ERC165NotSupported');
const ERC165InterfacesSupported = artifacts.require('ERC165InterfacesSupported');
const ERC165StorageMock = artifacts.require('ERC165StorageMock');
const ERC1820ImplementerMock = artifacts.require('ERC1820ImplementerMock');

module.exports = function (deployer) {
  deployer.deploy(ERC165Mock);
  deployer.deploy(ERC165CheckerMock);
  deployer.deploy(ERC165MissingData);
  deployer.deploy(ERC165NotSupported);
  deployer.deploy(ERC165InterfacesSupported);
  deployer.deploy(ERC165StorageMock);
  deployer.deploy(ERC1820ImplementerMock);
};
