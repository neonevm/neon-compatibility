import pytest

import brownie
from brownie._config import CONFIG
from brownie.test.managers.runner import RevertContextManager


@pytest.fixture(scope="session", autouse=True)
def setup_env():
    brownie.reverts = RevertContextManager


@pytest.fixture(scope="module")
def module_isolation():
    """
    Resets the test environment before and after a test module runs. This ensures
    a clean environment for the module, and that it's results will not affect
    subsequent tests.
    """
    brownie.chain.reset()
    yield
    if not CONFIG.argv["interrupt"]:
        brownie.chain.reset()


@pytest.fixture
def fn_isolation(module_isolation):
    """
    Performs the actions of module_isolation, takes a snapshot after all module
    scoped fixtures have run, and reverts to this snapshot at the start of each test.

    Used to ensure that each test in a module begins with an identical environment.
    """
    brownie.chain.snapshot()
    yield
    if not CONFIG.argv["interrupt"]:
        brownie.chain.revert()

#TODO: Our proxy don't support evm_snapshot: https://github.com/neonlabsorg/proxy-model.py/issues/199
# @pytest.fixture(scope="function", autouse=True)
# def isolate(fn_isolation):
#     # perform a chain rewind after completing each test, to ensure proper isolation
#     # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
#     pass


@pytest.fixture(scope="module")
def token(brownie_project, accounts):
    return brownie_project.Token.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})


@pytest.fixture(scope="session")
def accounts():
    """Yields an Accounts container for the active project, used to access local accounts."""
    for _ in range(10):
        brownie.accounts.add()
    yield brownie.accounts


@pytest.fixture(scope="session")
def a():
    """Short form of the accounts fixture."""
    yield brownie.accounts


@pytest.fixture(scope="session")
def chain():
    """Yields a Chain object, used for interacting with the blockchain."""
    yield brownie.chain


@pytest.fixture(scope="session")
def Contract():
    """Yields the Contract class, used to interact with deployments outside of a project."""
    yield brownie.Contract


@pytest.fixture(scope="session")
def history():
    """Yields a TxHistory container for the active project, used to access transaction data."""
    yield brownie.history


@pytest.fixture(scope="session")
def rpc():
    """Yields an Rpc object, used for interacting with the local RPC client."""
    yield brownie.rpc


@pytest.fixture(scope="session")
def web3():
    """Yields an instantiated Web3 object, connected to the active network."""
    yield brownie.web3