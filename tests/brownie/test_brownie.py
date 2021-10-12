import allure
import pytest
from src.helpers.common.config import CD_BACK, PROXY_URL
from src.helpers.common.constants import NETWORK_NAME, Subfolder
from src.helpers.shell.processes import run_command_line

ADD_NETWORK = "brownie networks add Development"
DELETE_NETWORK = "brownie networks delete"

FEATURE = 'brownie'


@allure.epic(FEATURE)
@pytest.fixture(autouse=True)
def setup_and_teardown():
    aaa = f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
        host={PROXY_URL} {CD_BACK}"

    print(aaa)
    run_result = run_command_line(
        f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
            host={PROXY_URL} {CD_BACK}")
    print(run_result)
    yield
    bbb = f"{Subfolder.CD_BROWNIE} {DELETE_NETWORK} {NETWORK_NAME} {CD_BACK}"
    print(bbb)
    run_result = run_command_line(
        f"{Subfolder.CD_BROWNIE} {DELETE_NETWORK} {NETWORK_NAME} {CD_BACK}")
    print(run_result)


@allure.epic(FEATURE)
@pytest.mark.skip(reason="now yet done")
@allure.feature(FEATURE)
def test_one():
    aaa = f"{Subfolder.CD_BROWNIE} {ADD_NETWORK} {NETWORK_NAME} \
        host={PROXY_URL} {CD_BACK}"

    print(aaa)
