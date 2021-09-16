import pytest
import os
from web3 import HTTPProvider, Web3
from src.helpers.common.config import CD_BACK, HTTP_URL
from src.helpers.common.constants import NETWORK_NAME, RunCommand, Subfolder
from src.helpers.common.error_message import TruffleError, TruffleBasedError
from src.helpers.shell.file_system import clean_up_folder
from src.helpers.shell.processes import run_command_line

BUILT_CONTRACTS_PATH = "/Metacoin/build/contracts"


@pytest.fixture(autouse=True)
def prepare_truffle_config():
    url = HTTP_URL
    w3 = Web3(HTTPProvider(url))
    account = w3.eth.account.create()
    os.environ['PRIVATE_KEY'] = account.key.hex()
    print(os.path.abspath(os.getcwd()) + BUILT_CONTRACTS_PATH)
    clean_up_folder(os.path.abspath(os.getcwd()) + BUILT_CONTRACTS_PATH)
    yield


def test_truffle_migration():
    # truffle migrate --network neonlabs
    actual_result = run_command_line(
        f"{Subfolder.CD_METACOIN} {RunCommand.TRUFFLE} " +
        f"migrate --network {NETWORK_NAME} {CD_BACK}")
    assert TruffleBasedError.ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS \
        not in actual_result
    assert TruffleError.ERROR_COULD_NOT_CONNECT not in actual_result
    assert TruffleError.ERROR_NOT_AUTHORIZED not in actual_result
    assert TruffleError.ERROR_TIMEOUT not in actual_result
    assert TruffleError.ERROR_CANNOT_READ_PROPERTIES not in actual_result
    print(actual_result)


def test_truffle_contract():
    # truffle neonlabs ./test/TestMetaCoin.sol
    actual_result = run_command_line(
        f"{Subfolder.CD_METACOIN} {RunCommand.TRUFFLE} {NETWORK_NAME} \
            ./test/TestMetaCoin.sol {CD_BACK}")
    assert TruffleError.ERROR_CONTRACTS_NOT_DEPLOYED not in actual_result
    assert TruffleError.ERROR_NO_CONTRACTS_DEPLOYED not in actual_result
    print(actual_result)


def test_truffle_test():
    # truffle neonlabs ./test/metacoin.js
    actual_result = run_command_line(
        f"{Subfolder.CD_METACOIN} {RunCommand.TRUFFLE} " +
        f"{NETWORK_NAME} ./test/metacoin.js {CD_BACK}")
    assert TruffleError.ERROR_CONTRACTS_NOT_DEPLOYED not in actual_result
    assert TruffleError.ERROR_NO_CONTRACTS_DEPLOYED not in actual_result
    print(actual_result)
