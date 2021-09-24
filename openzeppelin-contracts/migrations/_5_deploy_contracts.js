const ERC2771ContextMock = artifacts.require('ERC2771ContextMock');
const MinimalForwarder = artifacts.require('MinimalForwarder');
const ContextMockCaller = artifacts.require('ContextMockCaller');

const trustedForwarder = "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082";

module.exports = function (deployer) {
  deployer.deploy(ERC2771ContextMock, trustedForwarder);
  deployer.deploy(MinimalForwarder);
  deployer.deploy(ContextMockCaller);
};
