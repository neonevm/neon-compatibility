#!/usr/bin/python3

import pytest

from brownie import accounts


@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
    pass


@pytest.fixture(scope="module")
def token(brownie_project):
    return brownie_project.Token.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})
