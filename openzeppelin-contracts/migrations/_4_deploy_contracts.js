const TimelockController = artifacts.require('TimelockController');
const CompTimelock = artifacts.require('CompTimelock');
const Implementation2 = artifacts.require('Implementation2');
const ERC20VotesMock = artifacts.require('ERC20VotesMock');
const ERC20VotesCompMock = artifacts.require('ERC20VotesCompMock');
const GovernorMock = artifacts.require('GovernorMock');
const GovernorCompMock = artifacts.require('GovernorCompMock');
const GovernorTimelockCompoundMock = artifacts.require('GovernorTimelockCompoundMock');
const GovernorTimelockControlMock = artifacts.require('GovernorTimelockControlMock');
const CallReceiverMock = artifacts.require('CallReceiverMock');

const minDelay = 3;
const proposers = [
  "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082",
  "0xE88FA6b326602d3D9dF8628e122f49bF37E48a0E"
];
const executors = [
  "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082"
];
const admin_ = "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082";
const delay_ = 1000000;
const name = "Mistery";
const symbol = "MST";
const ERC20Votes_token = "0xd4e7779cee201b0FAbBD9f85104D3Bd5587463f4";
const ERC20VotesComp_token = "0x493727048Ee2D8DfbcfB1b1AcD4A7b42c60A6d62";
const votingDelay_ = 1000000;
const votingPeriod_ = 1000000;
const quorumNumerator_ = 5;
const ICompoundTimelock_timelock_ = "0xe7fd1CFDF58b9904F24667FB9bE8f940CD2693E2";
const TimelockController_timelock_ = "0xc4A4672f3062aAa8a1D0e5343C701290956d6064";

module.exports = function (deployer) {
  deployer.deploy(TimelockController, minDelay, proposers, executors);
  deployer.deploy(CompTimelock, admin_, delay_);
  deployer.deploy(Implementation2);
  deployer.deploy(ERC20VotesMock, name, symbol);
  deployer.deploy(ERC20VotesCompMock, name, symbol);
  deployer.deploy(GovernorMock, name, ERC20Votes_token, votingDelay_, votingPeriod_, quorumNumerator_);
  deployer.deploy(GovernorCompMock, name, ERC20VotesComp_token, votingDelay_, votingPeriod_);
  deployer.deploy(GovernorTimelockCompoundMock, name, ERC20Votes_token, votingDelay_, votingPeriod_, ICompoundTimelock_timelock_, quorumNumerator_);
  deployer.deploy(GovernorTimelockControlMock, name, ERC20Votes_token, votingDelay_, votingPeriod_, TimelockController_timelock_, quorumNumerator_);
  deployer.deploy(CallReceiverMock);
};
