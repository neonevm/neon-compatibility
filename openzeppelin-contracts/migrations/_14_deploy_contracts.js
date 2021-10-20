const ConditionalEscrowMock = artifacts.require('ConditionalEscrowMock');
const Escrow = artifacts.require('Escrow');
const RefundEscrow = artifacts.require('RefundEscrow');

const address = "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082";

module.exports = function (deployer) {
  deployer.deploy(ConditionalEscrowMock);
  deployer.deploy(Escrow);
  deployer.deploy(RefundEscrow, address);
};
