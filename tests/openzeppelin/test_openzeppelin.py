from src.helpers.common.config import CD_BACK
from src.helpers.common.constants import TRUFFLE
from src.helpers.common.error_message import ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS
from src.helpers.shell.processes import run_command_line

CD_OPENZEPPELIN = "cd OpenZeppelin; pwd;"
# ERROR_TAG_LATEST = "Error: Returned error: Invalid tag latest"
ERROR_CONTRACTS_NOT_DEPLOYED = "Contracts have not been deployed \
    to any network."

ERROR_COULD_NOT_CONNECT = "Could not connect to your Ethereum client."
ERROR_NOT_AUTHORIZED = "Invalid JSON RPC response:"

SUCCESS_PASSING = "passing"
SUCCESS_CONTRACT = "Contract: Zazzle"
SUCCESS_1_ETHER = "1 ether"


# @pytest.mark.skip(reason="now yet done")
def test_truffle_with_openzeppelin():
    # truffle test
    actual_result = run_command_line(
        f"{CD_OPENZEPPELIN} {TRUFFLE} test {CD_BACK}")
    assert SUCCESS_PASSING in actual_result
    assert SUCCESS_CONTRACT in actual_result
    assert SUCCESS_1_ETHER in actual_result
    assert ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS not in actual_result
    print(actual_result)
