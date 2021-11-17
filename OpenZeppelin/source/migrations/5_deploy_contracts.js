const ERC2771ContextMock = artifacts.require('ERC2771ContextMock');
const MinimalForwarder = artifacts.require('MinimalForwarder');
const ContextMockCaller = artifacts.require('ContextMockCaller');

const trustedForwarder = process.env.ADDRESS_FROM;

module.exports = function (deployer) {
  deployer.deploy(ERC2771ContextMock, trustedForwarder);
  deployer.deploy(MinimalForwarder);
  deployer.deploy(ContextMockCaller);
};
