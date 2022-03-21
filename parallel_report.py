import re
import os
import glob
from typing import Dict, Tuple, List



def process_test_suite_results() -> Tuple[Dict[str, int], List[str]]:

    test_report  = {
        "passing": 0,
        "pending": 0,
        "failing": 0
    }

    skipped_files = []

    script_path = os.path.dirname(os.path.realpath(__file__))
    stdout_files = glob.glob(script_path + "/**/stdout", recursive=True)
    print("`stdout` files found: {}. Processing ...\n".format(len(stdout_files)))

    for stdout in stdout_files:
        with open(stdout, 'r+', encoding="utf8") as f:
            rep = f.read()
            result = re.findall(r"(\d+) (passing|pending|failing)", rep)
            if not result:
                skipped_files.append(stdout)
            for count in result:
                test_report[count[1]] += int(count[0])
    return test_report, skipped_files


def print_test_suite_results(test_report: Dict[str, int], skipped_files: List[str]):

    print("Summarize result:\n")
    for state in test_report:
        print("    {} - {}".format(state.capitalize(), test_report[state]))
    print("\nTotal tests - {:d}\n".format(sum(test_report.values())))

    print("Test files without test result - {}:\n".format(len(skipped_files)))

    for f in skipped_files:
        test_file_name = f.split("/", 3)[3].rsplit("/", 1)[0].replace("_", "")
        print("    {}".format(test_file_name))
     

test_report, skipped_files = process_test_suite_results()
print_test_suite_results(test_report, skipped_files)

