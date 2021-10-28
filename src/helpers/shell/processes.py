import allure
import os
from web3 import HTTPProvider, Web3
from src.helpers.common.config import PROXY_URL


@allure.step('Run command: "{0}"')
def run_command_line(command: str):
    print("============ running command... ============")
    command = "pwd: " + command
    print(command)
    stream = os.popen(command)
    output = stream.read()
    errors = stream.errors
    return output + errors


@allure.step('Preset variables')
def preset_variables():
    url = PROXY_URL
    w3 = Web3(HTTPProvider(url))
    accountFrom = w3.eth.account.create()
    os.environ['PRIVATE_KEY'] = accountFrom.key.hex()
    os.environ['ADDRESS_FROM'] = accountFrom.address
    accountTo = w3.eth.account.create()
    os.environ['ADDRESS_TO'] = accountTo.address
