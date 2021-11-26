import pathlib

import pytest

from brownie._config import CONFIG
from brownie import accounts, project
from src.helpers.common.config import PROXY_URL, NETWORK_ID


def pytest_collection_modifyitems(config, items):
    for item in items:
        if not item.location[0].startswith('tests/brownie'):
            continue
        mark = getattr(pytest.mark, 'allure_label').with_args(
            "Brownie", label_type="feature")
        item.add_marker(mark)


@pytest.fixture(scope="session", autouse=True)
def configure_neon_network():
    CONFIG.networks['neon'] = {
        "chainid": NETWORK_ID,
        "host": PROXY_URL,
        "id": "neon",
        "name": "neon"
    }
    CONFIG.set_active_network('neon')


@pytest.fixture(scope="session")
def brownie_project():
    accounts.add()
    pr = project.load(
        str((pathlib.Path(__file__).parent / 'token').absolute())
    )
    return pr
