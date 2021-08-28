require('dotenv').config({ path: '../.env' });
const Web3 = require('web3');
module.exports = {
    networks: {
        neonlabs: {
            provider: () => new Web3.providers.HttpProvider(process.env.HTTP_URL),
            network_id: process.env.NETWORK_ID,
            from: process.env.ADDRESS_FROM,
            to: process.env.ADDRESS_TO,
            disableConfirmationListener: process.env.DISABLE_CONFIRMATION === 'true' ? true : false,
            // gas
            // gasPrice
            // confirmations: - number of confirmations to wait between deployments (default: 0)
            // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
        }
    }
};