import re
import subprocess


test_report = {
    "passing": 0,
    "pending": 0,
    "failing": 0
}

skipped_files = []

stdout_files = subprocess.check_output('find openzeppelin-contracts/pout -name "stdout" | sort', shell=True).decode().splitlines()

for stdout in stdout_files:
    with open(stdout, 'r+') as f:
        rep = f.read()
        result = re.findall(r"(\d+) (passing|pending|failing)", rep)
        if not result:
            skipped_files.append(stdout)
        for count in result:
            test_report[count[1]] += int(count[0])

print(f"Count of files: {len(stdout_files)}\n")
print("Summarize result:\n")
for state in test_report:
    print(f"    {state.capitalize()} - {test_report[state]}")
print(f"\nTotal tests - {sum(test_report.values())}\n")

print(f"Test files without test result: \n")

for f in skipped_files:
    test_file_name = f.split("/", 3)[3].rsplit("/", 1)[0].replace("_", "")
    print(f"    {test_file_name}")

