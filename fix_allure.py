import json
import pathlib


openzeppelin_reports = pathlib.Path('openzeppelin-contracts/report/allure-results')
res_file_list = [str(res_file) for res_file in openzeppelin_reports.glob('*-result.json')]
print("Fix allure results: {}".format(len(res_file_list)))


for res_file in res_file_list:
    with open(res_file, 'r+') as f:
        report = json.load(f)
    report["labels"].append({
      "name": "epic",
      "value": "OpenZeppelin contracts"
    })
    with open(res_file, 'w+') as f:
        json.dump(report, f)
