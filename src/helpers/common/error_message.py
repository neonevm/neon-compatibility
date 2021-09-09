class TruffleBasedError(object):
    ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS = (
        "Returned error: 'EthereumModel' object has " +
        "no attribute 'eth_accounts'")


class TruffleError(object):
    # ERROR_TAG_LATEST = "Error: Returned error: Invalid tag latest"
    ERROR_CONTRACTS_NOT_DEPLOYED = "Contracts have not been deployed \
        to any network."

    ERROR_COULD_NOT_CONNECT = "Could not connect to your Ethereum client."
    ERROR_NOT_AUTHORIZED = "Invalid JSON RPC response:"
    ERROR_TIMEOUT = "Error: There was a timeout \
        while attempting to connect to the network"


class HardhatError(object):
    ERROR_ETHEREUM_MODEL_WEB3 = ("ProviderError: 'EthereumModel' object has " +
                                 "no attribute 'web3_clientVersion'")
