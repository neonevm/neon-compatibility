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

    ERROR_NO_CONTRACTS_DEPLOYED = "No contracts deployed."

    ERROR_CANNOT_READ_PROPERTIES = "TypeError: Cannot read properties \
        of undefined (reading '_alreadyWrapped')"

    ERROR_DEPLOYMENT_FAILED = "Error:  *** Deployment Failed ***"
    ERROR_BLOCK_NOT_AVAILABLE = "Error: Unhandled error. \
        ({ code: -32000, message: 'Block not available for slot"

    ERROR_SOCKET_TIMEOUT = "message: 'ESOCKETTIMEDOUT'"
    ERROR_ETIMEOUT = "Error: ETIMEDOUT"


class HardhatError(object):
    ERROR_ETHEREUM_MODEL_WEB3 = ("ProviderError: 'EthereumModel' object has " +
                                 "no attribute 'web3_clientVersion'")


class OpenZeppelinError(object):
    ERROR_BLOCK_NOT_AVAILABLE = "Error: Unhandled error. \
        ({ code: -32000, message: 'Block not available for slot"

    ERROR_NO_ARTIFACTS = \
        "Error: Could not find artifacts for Migrations from any sources"
