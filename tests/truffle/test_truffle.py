from src.helpers.common.config import CD_BACK
from src.helpers.common.constants import NETWORK_NAME, TRUFFLE
from src.helpers.common.error_message import ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS
from src.helpers.shell.processes import run_command_line

CD_METACOIN = "cd Metacoin; pwd;"
# ERROR_TAG_LATEST = "Error: Returned error: Invalid tag latest"
ERROR_CONTRACTS_NOT_DEPLOYED = "Contracts have not been deployed \
    to any network."

ERROR_COULD_NOT_CONNECT = "Could not connect to your Ethereum client."
ERROR_NOT_AUTHORIZED = "Invalid JSON RPC response:"
ERROR_TIMEOUT = "Error: There was a timeout while attempting \
    to connect to the network."


def test_truffle_migration():
    # truffle migrate --network neonlabs
    actual_result = run_command_line(
        f"{CD_METACOIN} {TRUFFLE} migrate --network {NETWORK_NAME} {CD_BACK}")
    assert ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS not in actual_result
    assert ERROR_COULD_NOT_CONNECT not in actual_result
    assert ERROR_NOT_AUTHORIZED not in actual_result
    assert ERROR_TIMEOUT not in actual_result
    print(actual_result)


def test_truffle_contract():
    # truffle neonlabs ./test/TestMetaCoin.sol
    actual_result = run_command_line(f"{CD_METACOIN} {TRUFFLE} {NETWORK_NAME} \
            ./test/TestMetaCoin.sol {CD_BACK}")
    assert ERROR_CONTRACTS_NOT_DEPLOYED not in actual_result
    print(actual_result)


def test_truffle_test():
    # truffle neonlabs ./test/metacoin.js
    actual_result = run_command_line(
        f"{CD_METACOIN} {TRUFFLE} {NETWORK_NAME} ./test/metacoin.js {CD_BACK}")
    assert ERROR_CONTRACTS_NOT_DEPLOYED not in actual_result
    print(actual_result)
