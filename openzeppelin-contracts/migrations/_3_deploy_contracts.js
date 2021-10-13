const PaymentSplitter = artifacts.require('PaymentSplitter');

const payees = [
  "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082",
  "0xE88FA6b326602d3D9dF8628e122f49bF37E48a0E"
];
const shares = [
  1,
  2
];

module.exports = function (deployer) {
  deployer.deploy(PaymentSplitter, payees, shares);
};
