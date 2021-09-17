import os
from web3 import HTTPProvider, Web3
from src.helpers.common.config import HTTP_URL


def run_command_line(command: str):
    print("============ running command... ============")
    print(command)
    stream = os.popen(command)
    output = stream.read()
    errors = stream.errors
    return output + errors


def preset_variables():
    url = HTTP_URL
    w3 = Web3(HTTPProvider(url))
    accountFrom = w3.eth.account.create()
    os.environ['PRIVATE_KEY'] = accountFrom.key.hex()
    os.environ['ADDRESS_FROM'] = accountFrom.address
    accountTo = w3.eth.account.create()
    os.environ['ADDRESS_TO'] = accountTo.address
