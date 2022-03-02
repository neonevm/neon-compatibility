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
    with open(stdout, 'r+', encoding="utf8") as f:
        rep = f.read()
        result = re.findall(r"(\d+) (passing|pending|failing)", rep)
        if not result:
            skipped_files.append(stdout)
        for count in result:
            test_report[count[1]] += int(count[0])

print("Count of files: {}\n".format(str(len(stdout_files))))
print("Summarize result:\n")
for state in test_report:
    print("    {} - {}".format(state.capitalize(), test_report[state]))
print("\nTotal tests - {:d}\n".format(sum(test_report.values())))

print("Test files without test result - {}:\n".format(len(skipped_files)))

for f in skipped_files:
    test_file_name = f.split("/", 3)[3].rsplit("/", 1)[0].replace("_", "")
    print(format("    {}", test_file_name))

