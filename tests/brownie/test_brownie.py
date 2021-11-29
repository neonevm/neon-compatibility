from brownie import network, accounts


def test_brownie_connect():
    network.connect('neon')
    assert network.is_connected()
    assert network.show_active() == 'neon'
    assert network.gas_limit() == 'auto'
    assert network.gas_price() == 'auto'


def test_brownie_deploy(brownie_project):
    deployed_contract = brownie_project.Token.deploy(
        "Test deploy", "TST", 10, 10000000, {"from": accounts[0]}
    )
    assert deployed_contract
