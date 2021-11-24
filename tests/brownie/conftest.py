import pathlib

import pytest

from brownie._config import CONFIG
from brownie import accounts, project
from src.helpers.common.config import PROXY_URL, NETWORK_ID


@pytest.fixture(scope="session", autouse=True)
def configure_neon_network():
    CONFIG.networks['neon'] = {
        "chainid": NETWORK_ID,
        "host": PROXY_URL,
        "id": "neon",
        "name": "neon"
    }


@pytest.fixture(scope="session")
def brownie_project():
    accounts.add()
    pr = project.load(
        str((pathlib.Path(__file__).parent / 'token').absolute())
    )
    return pr
