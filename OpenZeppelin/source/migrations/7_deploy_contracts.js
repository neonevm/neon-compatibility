const PausableMock = artifacts.require('PausableMock');
const PullPaymentMock = artifacts.require('PullPaymentMock');
const ReentrancyMock = artifacts.require('ReentrancyMock');
const ReentrancyAttack = artifacts.require('ReentrancyAttack');

module.exports = function (deployer) {
  deployer.deploy(PausableMock);
  deployer.deploy(PullPaymentMock);
  deployer.deploy(ReentrancyMock);
  deployer.deploy(ReentrancyAttack);
};
