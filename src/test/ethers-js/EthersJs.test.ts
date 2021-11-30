import { suite, test, skip } from '@testdeck/mocha';
import { epic, feature } from 'allure-decorators';
import { ethers } from 'ethers';
import { expect } from 'chai';
import { Config } from '../../../config/default';
import { ConnectionManager } from '../../helpers/ethers-js/ConnectionManager';
import { DataRetrieval } from '../../helpers/ethers-js/DataRetrieval';
import { formatEther } from '@ethersproject/units';
import { logger } from '../../utils/logger';
import { requestFaucet } from '../../helpers/faucet/faucet-requester';

const EpicName = 'Ethers.js';
const SuiteName = EpicName;

const JsonRpcProviderShouldNotBeNull = 'JsonRpcProvider should not be null';
const BlockNumberShouldBeNonZero = 'Block number should be non-zero';
const SignerShouldBeNotNull = 'Signer should not be null';
const BalanceShouldNotBeEqual0 = 'Balance should not be equal 0';
const FormattedBalanceShouldIncludeDot = 'Formatted Balance should include dot';
const ParsedEtherShouldBeBigNumber = 'Parsed Ether should be a BigNumber';
const TransactionShouldNotBeNull = 'Transaction should not be null';
const TokenNameShouldNotBeEmpty = 'Token name should not be empty';
const FormattedDaiShouldContainDot = 'Formatted Dai should contain dot';
// https://docs.ethers.io/v5/getting-started/
@suite(SuiteName)
class EthersJsTests {
  @epic(EpicName)
  @feature('Account test')
  @test
  public async shouldCreateAcccountWithEthersJs() {
    let initialBalance = 10 * Config.faucetQuotient;
    logger.notice(`Connecting to ${Config.url}`);
    const provider = new ConnectionManager().connectToJsonRpc(Config.url);
    logger.notice(`Provider: ${provider}`);
    const randomWallet = ethers.Wallet.createRandom();
    logger.notice(`Random wallet = ${randomWallet.address}`);
    const wallet = randomWallet.connect(provider);
    logger.notice(`Random wallet connected = ${wallet.provider}`);
    await requestFaucet(wallet.address, initialBalance);

    const balance = await wallet.getBalance();
    logger.notice(`Balance = ${balance.toString()}`);

    /*
    expect(
      balance.toString(),
      `Balance should equal ${initialBalance}`
    ).to.be.equal(initialBalance.toString());
    */
  }

  @epic(EpicName)
  @feature('Transaction count test')
  @test
  public async shouldCountTransactions() {
    // let initialBalance = 10 * Config.faucetQuotient;
    const provider = new ConnectionManager().connectToJsonRpc(Config.url);
    logger.notice(`Provider: ${provider}`);
    const randomWallet = ethers.Wallet.createRandom();
    logger.notice(`Random wallet = ${randomWallet.address}`);
    const wallet = randomWallet.connect(provider);
    logger.notice(`Random wallet connected = ${wallet.provider}`);

    const transactionCount = await wallet.getTransactionCount();
    logger.notice(`Transaction count: ${transactionCount}`);
  }

  @epic(EpicName)
  @feature('Connection test')
  @test
  public async shouldConnectViaEthersJs() {
    const provider = new ConnectionManager().connectToJsonRpc(Config.url);
    logger.notice(`Provider: ${provider}`);
    expect(provider, JsonRpcProviderShouldNotBeNull).to.not.be.null;
    expect(provider.connection.url).to.be.equal(Config.url);
    const blockNumber = await new DataRetrieval().getBlockNumber(provider);
    logger.notice(`Current block number = ${blockNumber}`);
    expect(blockNumber, BlockNumberShouldBeNonZero).to.be.greaterThan(0);
  }

  @epic(EpicName)
  @feature('Signer')
  @test
  public async testSigner() {
    const provider = new ConnectionManager().connectToJsonRpc(Config.url);
    const signer = provider.getSigner();
    expect(signer, SignerShouldBeNotNull).to.not.be.null;
    return signer;
  }

  @epic(EpicName)
  @feature('Querying the Blockchain')
  @test
  public async testQueryingBlockchain() {
    const provider = new ConnectionManager().connectToJsonRpc(Config.url);

    // Look up the current block number
    const blockNumber = await provider.getBlockNumber();
    logger.notice(`Block number = ${blockNumber}`);
    expect(blockNumber, BlockNumberShouldBeNonZero).to.be.greaterThan(0);
    // 13098598

    // Get the balance of an account (by address or ENS name, if supported by network)
    const balance = await provider.getBalance('ethers.eth');
    logger.notice(`Balance = ${balance}`);
    expect(balance, BalanceShouldNotBeEqual0).to.not.be.equal('0');
    // { BigNumber: "2337132817842795605" }

    // Often you need to format the output to something more user-friendly,
    // such as in ether (instead of wei)
    const formattedBalance = ethers.utils.formatEther(balance);
    logger.notice(`Formatted balance = ${formattedBalance}`);
    expect(formattedBalance, FormattedBalanceShouldIncludeDot).to.include('.');
    // '2.337132817842795605'

    // If a user enters a string in an input field, you may need
    // to convert it from ether (as a string) to wei (as a BigNumber)
    const parsedEther = ethers.utils.parseEther('1.0');
    logger.notice(`parsed Ether = ${parsedEther}`);
    expect(parsedEther, ParsedEtherShouldBeBigNumber).to.contain('BigNumber');
    // { BigNumber: "1000000000000000000" }
  }

  @epic(EpicName)
  @feature('Writing to the Blockchain')
  @test
  public async testWritingToTheBlockchain() {
    const signer = await this.testSigner();

    // Send 1 ether to an ens name.
    const tx = await signer.sendTransaction({
      to: 'ricmoo.firefly.eth',
      value: ethers.utils.parseEther('1.0')
    });
    logger.notice(`Transaction = ${tx}`);
    expect(tx, TransactionShouldNotBeNull).to.not.be.null;
  }

  @epic(EpicName)
  @feature('Contracts')
  @test
  public async testContracts() {
    const provider = new ConnectionManager().connectToJsonRpc(Config.url);

    // You can also use an ENS name for the contract address
    const daiAddress = 'dai.tokens.ethers.eth';

    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format)
    const daiAbi = [
      // Some details about the token
      'function name() view returns (string)',
      'function symbol() view returns (string)',

      // Get the account balance
      'function balanceOf(address) view returns (uint)',

      // Send some of your tokens to someone else
      'function transfer(address to, uint amount)',

      // An event triggered whenever anyone transfers to someone else
      'event Transfer(address indexed from, address indexed to, uint amount)'
    ];

    // The Contract object
    const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
    logger.notice(`Contract object = ${daiContract}`);
    expect(daiContract, 'Contract object should not be null').to.not.be.null;
    return daiContract;
  }

  @epic(EpicName)
  @feature('Read-Only Methods')
  @test
  public async testReadOnlyMethods() {
    const daiContract = await this.testContracts();

    // Get the ERC-20 token name
    const tokenName = await daiContract.name();
    logger.notice(`Token name = ${tokenName}`);
    expect(tokenName, TokenNameShouldNotBeEmpty).to.not.be.empty;
    // 'Dai Stablecoin'

    // Get the ERC-20 token symbol (for tickers and UIs)
    const tokenSymbol = await daiContract.symbol();
    logger.notice(`Token symbol = ${tokenSymbol}`);
    expect(tokenSymbol, 'Token symbol should not be empty').to.not.be.empty;
    // 'DAI'

    // Get the balance of an address
    const balance = await daiContract.balanceOf('ricmoo.firefly.eth');
    logger.notice(`Balance = ${balance}`);
    expect(balance, BalanceShouldNotBeEqual0).to.not.be.equal('0');
    // { BigNumber: "14032899074838529727100" }

    // Format the DAI for displaying to the user
    const formattedDai = ethers.utils.formatUnits(balance, 18);
    logger.notice(`Formatted Dai = ${formattedDai}`);
    expect(formattedDai, FormattedDaiShouldContainDot).to.contain('.');
    // '14032.8990748385297271'
  }

  @epic(EpicName)
  @feature('State Changing Methods')
  @test
  public async testStateChangingMethods() {
    const signer = await this.testSigner();
    const contract = await this.testContracts();

    // The DAI Contract is currently connected to the Provider,
    // which is read-only. You need to connect to a Signer, so
    // that you can pay to send state-changing transactions.
    const daiWithSigner = contract.connect(signer);

    // Each DAI has 18 decimal places
    const dai = ethers.utils.parseUnits('1.0', 18);

    // Send 1 DAI to "ricmoo.firefly.eth"
    const tx = daiWithSigner.transfer('ricmoo.firefly.eth', dai);
  }

  /*
  @epic(EpicName)
  @feature('Listening to Events')
  @test
  @skip
  public async testListeningToEvents() {
    const daiContract = await this.testContracts();

    // Receive an event when ANY transfer occurs
    daiContract.on('Transfer', (from, to, amount, event) => {
      logger.notice(`${from} sent ${formatEther(amount)} to ${to}`);
      // The event object contains the verbatim log data, the
      // EventFragment and functions to fetch the block,
      // transaction and receipt and event functions
    });

    // A filter for when a specific address receives tokens
    const myAddress = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    const filter = daiContract.filters.Transfer(null, myAddress);
    // {
    //   address: 'dai.tokens.ethers.eth',
    //   topics: [
    //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //     null,
    //     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
    //   ]
    // }

    // Receive an event when that filter occurs
    daiContract.on(filter, (from, to, amount, event) => {
      // The to will always be "address"
      logger.notice(`I got ${formatEther(amount)} from ${from}.`);
    });
  }
  */

  @epic(EpicName)
  @feature('Query Historic Events')
  @test
  public async testQueryHistoricEvents() {
    const signer = await this.testSigner();
    const daiContract = await this.testContracts();

    // Get the address of the Signer
    const myAddress = await signer.getAddress();
    // '0x8ba1f109551bD432803012645Ac136ddd64DBA72'

    // Filter for all token transfers from me
    const filterFrom = daiContract.filters.Transfer(myAddress, null);
    // {
    //   address: 'dai.tokens.ethers.eth',
    //   topics: [
    //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
    //   ]
    // }

    // Filter for all token transfers to me
    const filterTo = daiContract.filters.Transfer(null, myAddress);
    // {
    //   address: 'dai.tokens.ethers.eth',
    //   topics: [
    //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //     null,
    //     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
    //   ]
    // }

    // List all transfers sent from me a specific block range
    await daiContract.queryFilter(filterFrom, 9843470, 9843480);
    // [
    //   {
    //     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    //     args: [
    //       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    //       '0x8B3765eDA5207fB21690874B722ae276B96260E0',
    //       { BigNumber: "4750000000000000000" },
    //       amount: { BigNumber: "4750000000000000000" },
    //       from: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    //       to: '0x8B3765eDA5207fB21690874B722ae276B96260E0'
    //     ],
    //     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
    //     blockNumber: 9843476,
    //     data: '0x00000000000000000000000000000000000000000000000041eb63d55b1b0000',
    //     decode: [Function],
    //     event: 'Transfer',
    //     eventSignature: 'Transfer(address,address,uint256)',
    //     getBlock: [Function],
    //     getTransaction: [Function],
    //     getTransactionReceipt: [Function],
    //     logIndex: 69,
    //     removeListener: [Function],
    //     removed: false,
    //     topics: [
    //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
    //       '0x0000000000000000000000008b3765eda5207fb21690874b722ae276b96260e0'
    //     ],
    //     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
    //     transactionIndex: 81
    //   },
    //   {
    //     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    //     args: [
    //       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    //       '0x00De4B13153673BCAE2616b67bf822500d325Fc3',
    //       { BigNumber: "250000000000000000" },
    //       amount: { BigNumber: "250000000000000000" },
    //       from: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    //       to: '0x00De4B13153673BCAE2616b67bf822500d325Fc3'
    //     ],
    //     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
    //     blockNumber: 9843476,
    //     data: '0x00000000000000000000000000000000000000000000000003782dace9d90000',
    //     decode: [Function],
    //     event: 'Transfer',
    //     eventSignature: 'Transfer(address,address,uint256)',
    //     getBlock: [Function],
    //     getTransaction: [Function],
    //     getTransactionReceipt: [Function],
    //     logIndex: 70,
    //     removeListener: [Function],
    //     removed: false,
    //     topics: [
    //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
    //       '0x00000000000000000000000000de4b13153673bcae2616b67bf822500d325fc3'
    //     ],
    //     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
    //     transactionIndex: 81
    //   }
    // ]

    //
    // The following have had the results omitted due to the
    // number of entries; but they provide some useful examples
    //

    // List all transfers sent in the last 10,000 blocks
    await daiContract.queryFilter(filterFrom, -10000);

    // List all transfers ever sent to me
    await daiContract.queryFilter(filterTo);
  }

  @epic(EpicName)
  @feature('Signing Messages')
  @test
  public async testSigningMessages() {
    const signer = await this.testSigner();

    // To sign a simple string, which are used for
    // logging into a service, such as CryptoKitties,
    // pass the string in.
    let signature = await signer.signMessage('Hello World');
    // '0x3077d1b961d146d5a956e67495cbfcc2b6971c787690382ff85ef4403d96fee1625bb24fe54c69b628b6cb34d0a2cb3bdff10a635b66d76585db0dc378363c3c1c'

    //
    // A common case is also signing a hash, which is 32
    // bytes. It is important to note, that to sign binary
    // data it MUST be an Array (or TypedArray)
    //

    // This string is 66 characters long
    const message =
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

    // This array representation is 32 bytes long
    const messageBytes = ethers.utils.arrayify(message);
    // Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]

    // To sign a hash, you most often want to sign the bytes
    signature = await signer.signMessage(messageBytes);
    // '0x0d030809ac2ce701e4303885c4fc3f019e64281dea9352f77f482c5324733c48415040d10ee834fb4f048cd5a4e496a55f81c0a374e52c7016dfa16357a0f97a1b'
  }

  // https://github.com/ethers-io/ethers.js/issues/2348
  // const provider = new ethers.providers.StaticJsonRpcProvider('https://proxy.devnet.neonlabs.org/solana', { name: 'Neon', chainId: 245022926 });
  @epic(EpicName)
  @feature('StaticJsonRpcProvider test')
  @test
  public async shouldCheckStaticJsonRpcProvider() {
    /*
    // sample
    const provider = new ethers.providers.StaticJsonRpcProvider(
      process.env.PROXY_URL,
      { name: 'Neon', chainId: parseInt(process.env.NETWORK_ID ?? '0') }
    );
    */
    const provider = new ConnectionManager().connectToStaticJsonRpcProvider(
      Config.url,
      parseInt(Config.networkId)
    );
    logger.notice(`Provider: ${provider}`);
    const randomWallet = ethers.Wallet.createRandom();
    logger.notice(`Random wallet = ${randomWallet.address}`);
    const wallet = randomWallet.connect(provider);
    logger.notice(`Random wallet connected = ${wallet.provider}`);

    const transactionCount = await wallet.getTransactionCount();
    logger.notice(`Transaction count: ${transactionCount}`);

    // Look up the current block number
    const blockNumber = await provider.getBlockNumber();
    logger.notice(`Block number = ${blockNumber}`);
    expect(blockNumber, BlockNumberShouldBeNonZero).to.be.greaterThan(0);
    // 13098598
    console.log('StaticJsonRpcProvider has finished!');
  }

  public before() {}

  public after() {}
}
