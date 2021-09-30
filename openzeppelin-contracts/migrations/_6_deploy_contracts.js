const ClonesMock = artifacts.require('ClonesMock');
const UpgradeableBeacon = artifacts.require('UpgradeableBeacon');
const BeaconProxy = artifacts.require('BeaconProxy');
const DummyImplementation = artifacts.require('DummyImplementation');
const DummyImplementationV2 = artifacts.require('DummyImplementationV2');
const BadBeaconNoImpl = artifacts.require('BadBeaconNoImpl');
const BadBeaconNotContract = artifacts.require('BadBeaconNotContract');
const Implementation1 = artifacts.require('Implementation1');
const Implementation2 = artifacts.require('Implementation2');
const ERC1967Proxy = artifacts.require('ERC1967Proxy');
const ProxyAdmin = artifacts.require('ProxyAdmin');
const TransparentUpgradeableProxy = artifacts.require('TransparentUpgradeableProxy');
const InitializableMock = artifacts.require('InitializableMock');
const SampleChild = artifacts.require('SampleChild');
const UUPSUpgradeableMock = artifacts.require('UUPSUpgradeableMock');
const UUPSUpgradeableUnsafeMock = artifacts.require('UUPSUpgradeableUnsafeMock');
const UUPSUpgradeableBrokenMock = artifacts.require('UUPSUpgradeableBrokenMock');
const CountersImpl = artifacts.require('CountersImpl');

const implementation_ = "0x08c74eAc6e206A88F2161034C3411a6d6d196795";
const beacon = "0xb427F435811ecB4688A32BE8B494B4AC23F2D14C";
const data = [11, 12];
const _logic = "0x827705bd3b08548725039f3A54531B3d47Ae2257";
const admin_ = "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082";


module.exports = function (deployer) {
  deployer.deploy(ClonesMock);
  deployer.deploy(UpgradeableBeacon, implementation_);
  deployer.deploy(BeaconProxy, beacon, data);
  deployer.deploy(DummyImplementation);
  deployer.deploy(DummyImplementationV2);
  deployer.deploy(BadBeaconNoImpl);
  deployer.deploy(BadBeaconNotContract);
  deployer.deploy(Implementation1);
  deployer.deploy(Implementation2);
  deployer.deploy(ERC1967Proxy, _logic, data);
  deployer.deploy(ProxyAdmin);
  deployer.deploy(TransparentUpgradeableProxy, _logic, admin_, data);
  deployer.deploy(InitializableMock);
  deployer.deploy(SampleChild);
  deployer.deploy(UUPSUpgradeableMock);
  deployer.deploy(UUPSUpgradeableUnsafeMock);
  deployer.deploy(UUPSUpgradeableBrokenMock);
  deployer.deploy(CountersImpl);
};
