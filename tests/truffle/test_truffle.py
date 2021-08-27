import pytest
from src.helpers.shell.processes import run_command_line
from src.helpers.common.constants import NETWORK_NAME

CD_METACOIN = "cd Metacoin; pwd;"
# ERROR_TAG_LATEST = "Error: Returned error: Invalid tag latest"
ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS = "Contracts have not been deployed to any network."
ERROR_CONTRACTS_NOT_DEPLOYED = "Contracts have not been deployed to any network."
CD_BACK = "; cd ..; pwd;"


def test_truffle_migration():
    # truffle migrate --network neonlabs
    actual_result = run_command_line(
        f"{CD_METACOIN} truffle migrate --network {NETWORK_NAME} {CD_BACK}")
    assert ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS not in actual_result
    print(actual_result)


def test_truffle_contract():
    # truffle neonlabs ./test/TestMetaCoin.sol
    actual_result = run_command_line(
        f"{CD_METACOIN} truffle {NETWORK_NAME} ./test/TestMetaCoin.sol {CD_BACK}"
    )
    assert ERROR_CONTRACTS_NOT_DEPLOYED not in actual_result
    print(actual_result)


def test_truffle_test():
    # truffle neonlabs ./test/metacoin.js
    actual_result = run_command_line(
        f"{CD_METACOIN} truffle {NETWORK_NAME} ./test/metacoin.js {CD_BACK}")
    print(actual_result)
