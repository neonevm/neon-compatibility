const Web3 = require('web3');
module.exports = {
    networks: {
        neonlabs: {
            provider: () => new Web3.providers.HttpProvider("https://proxy.testnet.neonlabs.org/solana"),
            network_id: "*",
            from: "0x1234567890abcdef1234567890ABCDEF12345678",
        },
        local: {
            provider: () => new Web3.providers.HttpProvider(`http://localhost:9090/solana`),
            network_id: "*",
            from: "0x1234567890abcdef1234567890ABCDEF12345678",
            disableConfirmationListener: true
            // gas
            // gasPrice
            // confirmations: - number of confirmations to wait between deployments (default: 0)
            // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
        }
    }
};
