import pathlib

import allure
import pytest

from brownie._config import CONFIG
from brownie import network, accounts, project

from src.helpers.common.config import PROXY_URL, NETWORK_ID

ADD_NETWORK = "brownie networks add Ethereum"
DELETE_NETWORK = "brownie networks delete"

FEATURE = 'brownie'


@pytest.fixture(scope="module", autouse=True)
def configure_neon_network():
    CONFIG.networks['neon'] = {
        "chainid": NETWORK_ID,
        "host": PROXY_URL,
        "id": "neon",
        "name": "neon"
    }


@allure.feature(FEATURE)
@allure.story("Connect brownie")
def test_brownie_connect():
    network.connect('neon')
    assert network.is_connected()
    assert network.show_active() == 'neon'
    assert network.gas_limit() == 'auto'
    assert network.gas_price() == 'auto'


@allure.feature(FEATURE)
@allure.story("Deploy contract")
def test_brownie_deploy():
    accounts.add()
    pr = project.load(
        str((pathlib.Path(__file__).parent / 'token').absolute())
    )
    deployed_contract = pr.Token.deploy(
        "Test deploy", "TST", 10, 10000000, {"from": accounts[0]}
    )
    assert deployed_contract
