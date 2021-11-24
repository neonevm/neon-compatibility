import allure

from brownie import network, accounts

ADD_NETWORK = "brownie networks add Ethereum"
DELETE_NETWORK = "brownie networks delete"

FEATURE = 'brownie'


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
def test_brownie_deploy(brownie_project):
    print(len(accounts))
    deployed_contract = brownie_project.Token.deploy(
        "Test deploy", "TST", 10, 10000000, {"from": accounts[0]}
    )
    assert deployed_contract
