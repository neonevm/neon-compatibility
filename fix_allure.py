import json
import pathlib


openzeppelin_reports = pathlib.Path('openzeppelin-contracts/report/allure-results')

for res_file in map(str, openzeppelin_reports.glob('*-result.json')):
    with open(res_file, 'r+') as f:
        report = json.load(f)
    report["labels"].append({
      "name": "epic",
      "value": "OpenZeppelin contracts"
    })
    with open(res_file, 'w+') as f:
        json.dump(report, f)

