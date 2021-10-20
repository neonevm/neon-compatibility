const AddressImpl = artifacts.require('AddressImpl');
const EtherReceiverMock = artifacts.require('EtherReceiverMock');
const CallReceiverMock = artifacts.require('CallReceiverMock');

const ArraysImpl = artifacts.require('ArraysImpl');

const ContextMock = artifacts.require('ContextMock');
const ContextMockCaller = artifacts.require('ContextMockCaller');

const CountersImpl = artifacts.require('CountersImpl');

const Create2Impl = artifacts.require('Create2Impl');
const ERC20Mock = artifacts.require('ERC20Mock');
const ERC1820Implementer = artifacts.require('ERC1820Implementer');

const MulticallTokenMock = artifacts.require('MulticallTokenMock');

const StorageSlotMock = artifacts.require('StorageSlotMock');

const StringsMock = artifacts.require('StringsMock');

const TimersBlockNumberImpl = artifacts.require('TimersBlockNumberImpl');

const TimersTimestampImpl = artifacts.require('TimersTimestampImpl');


const array = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const name = "Mistery";
const symbol = "MST";
const initialAccount = "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082";
const initialBalance = 10000;

module.exports = function (deployer) {
  deployer.deploy(AddressImpl);
  deployer.deploy(EtherReceiverMock);
  deployer.deploy(CallReceiverMock);
  deployer.deploy(ArraysImpl, array);
  deployer.deploy(ContextMock);
  deployer.deploy(ContextMockCaller);
  deployer.deploy(CountersImpl);
  deployer.deploy(Create2Impl);
  deployer.deploy(ERC20Mock, name, symbol, initialAccount, initialBalance);
  deployer.deploy(ERC1820Implementer);
  deployer.deploy(MulticallTokenMock, initialBalance);
  deployer.deploy(StorageSlotMock);
  deployer.deploy(StringsMock);
  deployer.deploy(TimersBlockNumberImpl);
  deployer.deploy(TimersTimestampImpl);
};
