import allure
import pytest
from src.helpers.common.config import CD_BACK, PROXY_URL, NETWORK_ID
from src.helpers.common.constants import NETWORK_NAME, Subfolder
from src.helpers.shell.processes import run_command_line

ADD_NETWORK = "brownie networks add Ethereum"
DELETE_NETWORK = "brownie networks delete"

FEATURE = 'brownie'


@pytest.fixture(autouse=True)
def setup_and_teardown():
    # brownie networks add Ethereum 110 host=https://proxy.devnet.neonlabs.org/solana chainid=110
    command_add_network = f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
        host={PROXY_URL} chainid={NETWORK_ID} {CD_BACK}"

    print(command_add_network)
    run_result = run_command_line(
        f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
            host={PROXY_URL} {CD_BACK}")
    print(run_result)
    yield
    command_delete_network = f"{Subfolder.CD_BROWNIE} {DELETE_NETWORK} {NETWORK_NAME} {CD_BACK}"
    print(command_delete_network)
    run_result = run_command_line(
        f"{Subfolder.CD_BROWNIE} {DELETE_NETWORK} {NETWORK_NAME} {CD_BACK}")
    print(run_result)


@pytest.mark.skip(reason="now yet done")
@allure.feature(FEATURE)
def test_connect():
    aaa = f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
        host={PROXY_URL} {CD_BACK}"

    print(aaa)
