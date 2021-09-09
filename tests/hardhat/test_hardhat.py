import pytest
from src.helpers.common.config import CD_BACK
from src.helpers.common.constants import Subfolder
from src.helpers.common.error_message import HardhatError
from src.helpers.common.success_message import HardhatSuccess
from src.helpers.shell.processes import run_command_line


@pytest.mark.skip(reason="now yet done")
def test_hardhat_simple():
    # truffle test
    # actual_result = run_command_line(
    #     f"{Subfolder.CD_HARDHAT_ADVANCED} {TRUFFLE} test {CD_BACK}"
    # )
    # assert SUCCESS_PASSING in actual_result
    # assert SUCCESS_CONTRACT in actual_result
    # assert SUCCESS_1_ETHER in actual_result
    # assert ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS not in actual_result
    # print(actual_result)
    pass


# green test result:
# go to hardhat-advanced/hardhat.config.js
# and comment out the following line
# defaultNetwork: "neonlabs",
def test_hardhat_advanced():
    # REPORT_GAS=true npx hardhat test
    command = "REPORT_GAS=true npx hardhat test"
    actual_result = run_command_line(
        f"{Subfolder.CD_HARDHAT_ADVANCED} {command} {CD_BACK}")
    assert HardhatError.ERROR_ETHEREUM_MODEL_WEB3 not in actual_result
    assert HardhatSuccess.DEPLOYING in actual_result
    assert HardhatSuccess.CHANGING in actual_result
    assert HardhatSuccess.TEST_OK in actual_result
    print(actual_result)
