const PaymentSplitter = artifacts.require('PaymentSplitter');

const payees = [
  process.env.ADDRESS_FROM,
  process.env.ADDRESS_TO,
];
const shares = [
  1,
  2
];

module.exports = function (deployer) {
  deployer.deploy(PaymentSplitter, payees, shares);
};
