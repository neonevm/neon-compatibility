import os
import pytest
from shutil import copy
from src.helpers.common.success_message import OpenZeppelinSuccess
from src.helpers.common.config import CD_BACK
from src.helpers.common.constants import RunCommand, Subfolder
from src.helpers.common.error_message import TruffleBasedError
from src.helpers.shell.file_system import clean_up_folder
from src.helpers.shell.processes import preset_variables, run_command_line
from tests.openzeppelin.input_data import InputData

CONTRACTS_PATH = "/OpenZeppelin/contracts/"
MIGRATIONS_PATH = "/OpenZeppelin/migrations/"
TEST_PATH = "/OpenZeppelin/test/"
SOURCE_CONTRACTS_PATH = "/OpenZeppelin/source/contracts/"
SOURCE_MIGRATIONS_PATH = "/OpenZeppelin/source/migrations/"
SOURCE_TEST_PATH = "/OpenZeppelin/source/test/"

INPUT_DATA = [
    (InputData("access/Ownable.test.js", ["access/Ownable.test.js"], [
        "access/Ownable.sol", "mocks/OwnableMock.sol",
        "mocks/AccessControlMock.sol", "mocks/AccessControlEnumerableMock.sol",
        "access/AccessControlEnumerable.sol",
        "access/IAccessControlEnumerable.sol",
        "utils/structs/EnumerableSet.sol", "access/AccessControl.sol",
        "utils/Context.sol", "IAccessControl.sol"
    ], "2_deploy_contracts.js")),
    (InputData("access/AccessControl.test.js", [
        "access/AccessControl.test.js", "access/AccessControl.behavior.js"
    ], [
        "mocks/AccessControlMock.sol", "mocks/AccessControlEnumerableMock.sol",
        "access/AccessControlEnumerable.sol",
        "access/IAccessControlEnumerable.sol",
        "utils/structs/EnumerableSet.sol", "access/AccessControl.sol"
    ], "2_deploy_contracts.js")),
    (InputData("access/IAccessControlEnumerable.test.js", [
        "access/IAccessControlEnumerable.test.js",
        "access/AccessControl.behavior.js"
    ], ["mocks/AccessControlEnumerableMock.sol"], "2_deploy_contracts.js")),
    (InputData("finance/PaymentSplitter.test.js",
               ["finance/PaymentSplitter.test.js"], [
                   "finance/PaymentSplitter.sol", "utils/Address.sol",
                   "utils/Context.sol"
               ], "3_deploy_contracts.js"))
]


def get_contracts_path():
    return os.path.abspath(os.getcwd()) + CONTRACTS_PATH


def get_migrations_path():
    return os.path.abspath(os.getcwd()) + MIGRATIONS_PATH


def get_test_path():
    return os.path.abspath(os.getcwd()) + TEST_PATH


def get_source_contracts_path():
    return os.path.abspath(os.getcwd()) + SOURCE_CONTRACTS_PATH


def get_source_migrations_path():
    return os.path.abspath(os.getcwd()) + SOURCE_MIGRATIONS_PATH


def get_source_test_path():
    return os.path.abspath(os.getcwd()) + SOURCE_TEST_PATH


def copy_files(input_data: InputData):
    # tests
    [
        copy(get_source_test_path() + x,
             get_test_path() + x) for x in input_data.test_files
    ]
    # contracts
    [
        copy(get_source_contracts_path() + x,
             get_contracts_path() + x) for x in input_data.contracts
    ]
    # common migration script
    copy(get_source_migrations_path() + "1_initial_migration.js",
         get_migrations_path() + "1_initial_migration.js")
    # migration script
    copy(get_source_migrations_path() + input_data.migration_script,
         get_migrations_path() + input_data.migration_script)


@pytest.fixture(autouse=True)
def prepare_truffle_config():
    preset_variables()
    # print(get_contracts_path())
    # print(get_migrations_path())
    # print(get_test_path())
    [clean_up_folder(x) for x in os.listdir(get_contracts_path())]
    [clean_up_folder(x) for x in os.listdir(get_migrations_path())]
    [clean_up_folder(x) for x in os.listdir(get_test_path())]
    yield


# # @pytest.mark.skip(reason="now yet done")
# def test_truffle_with_openzeppelin():
#     # truffle test
#     actual_result = run_command_line(
#         f"{Subfolder.CD_OPENZEPPELIN} {RunCommand.TRUFFLE} test {CD_BACK}")
#     assert OpenZeppelinSuccess.SUCCESS_PASSING in actual_result
#     assert OpenZeppelinSuccess.SUCCESS_CONTRACT in actual_result
#     assert OpenZeppelinSuccess.SUCCESS_1_ETHER in actual_result
#     assert TruffleBasedError.ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS \
#         not in actual_result
#     print(actual_result)

# def test_ownable():
#     # truffle --network neonlabs test ./test/access/Ownable.test.js
#     command = "--network neonlabs test ./test/access/Ownable.test.js"
#     actual_result = run_command_line(
#         f"{Subfolder.CD_OPENZEPPELIN} {RunCommand.TRUFFLE} {command} {CD_BACK}"
#     )
#     # assert OpenZeppelinSuccess.SUCCESS_PASSING in actual_result
#     # assert OpenZeppelinSuccess.SUCCESS_CONTRACT in actual_result
#     # assert OpenZeppelinSuccess.SUCCESS_1_ETHER in actual_result
#     # assert TruffleBasedError.ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS \
#     #     not in actual_result
#     print(actual_result)


@pytest.mark.parametrize("input_data", INPUT_DATA)
def test_contracts(input_data: InputData):
    # print(input_data)
    copy_files(input_data)

    # truffle --network neonlabs test ./test/access/[test file name]
    command = f"--network neonlabs test ./test/{input_data.test_file}"
    actual_result = run_command_line(
        f"{Subfolder.CD_OPENZEPPELIN} {RunCommand.TRUFFLE} {command} {CD_BACK}"
    )
    # assert OpenZeppelinSuccess.SUCCESS_PASSING in actual_result
    # assert OpenZeppelinSuccess.SUCCESS_CONTRACT in actual_result
    # assert OpenZeppelinSuccess.SUCCESS_1_ETHER in actual_result
    # assert TruffleBasedError.ERROR_NO_ATTRIBUTE_ETH_ACCOUNTS \
    #     not in actual_result
    print(actual_result)
