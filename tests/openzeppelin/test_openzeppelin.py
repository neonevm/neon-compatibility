from src.helpers.common.success_message import OpenZeppelinSuccess
from src.helpers.common.config import CD_BACK
from src.helpers.common.constants import Subfolder
from src.helpers.common.error_message import TruffleBasedError
from src.helpers.shell.processes import run_command_line


# @pytest.mark.skip(reason="now yet done")
def test_truffle_with_openzeppelin():
    # truffle test
    actual_result = run_command_line(
        f"{Subfolder.CD_OPENZEPPELIN} {Subfolder.TRUFFLE} test {CD_BACK}"
    )
    assert OpenZeppelinSuccess.SUCCESS_PASSING in actual_result
    assert OpenZeppelinSuccess.SUCCESS_CONTRACT in actual_result
    assert OpenZeppelinSuccess.SUCCESS_1_ETHER in actual_result
    assert TruffleBasedError.ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS not in actual_result
    print(actual_result)
