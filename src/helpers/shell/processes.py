import os
import allure
import subprocess
from web3 import HTTPProvider, Web3
from src.helpers.common.config import PROXY_URL


@allure.step('Run command: "{0}"')
def run_command_line(command: str) -> subprocess.CompletedProcess:
    print("============ running command... ============")
    print(command)
    cmd = subprocess.run(command, capture_output=True, shell=True)
    print(cmd.stdout.decode())
    print(cmd.stderr.decode())
    return cmd


@allure.step('Preset variables')
def preset_variables():
    url = PROXY_URL
    w3 = Web3(HTTPProvider(url))
    accountFrom = w3.eth.account.create()
    os.environ['PRIVATE_KEY'] = accountFrom.key.hex()
    os.environ['ADDRESS_FROM'] = accountFrom.address
    accountTo = w3.eth.account.create()
    os.environ['ADDRESS_TO'] = accountTo.address
