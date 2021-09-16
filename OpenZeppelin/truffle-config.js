require("dotenv").config({ path: "../.env" });
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  networks: {
    neonlabs: {
      /*
            provider: () => new Web3.providers.HttpProvider(process.env.HTTP_URL),
            network_id: process.env.NETWORK_ID,
            from: process.env.ADDRESS_FROM,
            to: process.env.ADDRESS_TO,
            disableConfirmationListener: process.env.DISABLE_CONFIRMATION === "true" ? true : false,
            */
      provider: () => {
        console.log("=============================");
        console.log(process.env.PRIVATE_KEY);
        console.log(process.env.HTTP_URL);
        
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          process.env.HTTP_URL
        );
      },
      network_id: process.env.NETWORK_ID,

      // gas
      // gasPrice
      // confirmations: - number of confirmations to wait between deployments (default: 0)
      // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
    },
  },
};
