const EIP712External = artifacts.require('EIP712External');
const ECDSAMock = artifacts.require('ECDSAMock');
const MerkleProofWrapper = artifacts.require('MerkleProofWrapper');
const SignatureCheckerMock = artifacts.require('SignatureCheckerMock');
const ERC1271WalletMock = artifacts.require('ERC1271WalletMock');

const name = "Something";
const version = "0.1";
const originalOwner = "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082";

module.exports = function (deployer) {
  deployer.deploy(EIP712External, name, version);
  deployer.deploy(ECDSAMock);
  deployer.deploy(MerkleProofWrapper);
  deployer.deploy(SignatureCheckerMock);
  deployer.deploy(ERC1271WalletMock, originalOwner);
};
