import pytest
from src.helpers.common.config import CD_BACK, HTTP_URL
from src.helpers.common.constants import NETWORK_NAME, Subfolder
from src.helpers.shell.processes import run_command_line

ADD_NETWORK = "brownie networks add Development"
DELETE_NETWORK = "brownie networks delete"


@pytest.fixture(autouse=True)
def setup_and_teardown():
    aaa = f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
        host={HTTP_URL} {CD_BACK}"

    print(aaa)
    run_result = run_command_line(
        f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
            host={HTTP_URL} {CD_BACK}")
    print(run_result)
    yield
    bbb = f"{Subfolder.CD_BROWNIE} {DELETE_NETWORK} {NETWORK_NAME} {CD_BACK}"
    print(bbb)
    run_result = run_command_line(
        f"{Subfolder.CD_BROWNIE} {DELETE_NETWORK} {NETWORK_NAME} {CD_BACK}")
    print(run_result)


@pytest.mark.skip(reason="now yet done")
def test_connect():
    aaa = f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
        host={HTTP_URL} {CD_BACK}"

    print(aaa)
