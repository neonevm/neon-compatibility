const BitMap = artifacts.require('BitMapMock');
const EnumerableMapMock = artifacts.require('EnumerableMapMock');
const EnumerableBytes32SetMock = artifacts.require('EnumerableBytes32SetMock');
const EnumerableAddressSetMock = artifacts.require('EnumerableAddressSetMock');
const EnumerableUintSetMock = artifacts.require('EnumerableUintSetMock');

module.exports = function (deployer) {
  deployer.deploy(BitMap);
  deployer.deploy(EnumerableMapMock);
  deployer.deploy(EnumerableBytes32SetMock);
  deployer.deploy(EnumerableAddressSetMock);
  deployer.deploy(EnumerableUintSetMock);
};
