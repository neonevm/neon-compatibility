const MathMock = artifacts.require('MathMock');
const SafeCastMock = artifacts.require('SafeCastMock');
const SafeMathMock = artifacts.require('SafeMathMock');
const SignedSafeMathMock = artifacts.require('SignedSafeMathMock');

module.exports = function (deployer) {
  deployer.deploy(MathMock);
  deployer.deploy(SafeCastMock);
  deployer.deploy(SafeMathMock);
  deployer.deploy(SignedSafeMathMock);
};
