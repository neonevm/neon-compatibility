const AccessControlMock = artifacts.require('AccessControlMock');
const AccessControlEnumerableMock = artifacts.require('AccessControlEnumerableMock');
const OwnableMock = artifacts.require('OwnableMock');

module.exports = function (deployer) {
  deployer.deploy(AccessControlMock);
  deployer.deploy(AccessControlEnumerableMock);
  deployer.deploy(OwnableMock);
};
