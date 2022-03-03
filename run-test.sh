#!/bin/bash

npx hardhat compile
find test -name "*.test.js" | sort | parallel -k --jobs ${JOBS_NUMBER} --results pout 'npx hardhat test {}'

python3 /opt/parallel_report.py
python3 /opt/fix_allure.py
echo "The allure-results archive is creating at: /opt/allure-reports.tar"
tar -cf /opt/allure-reports.tar -C /opt/openzeppelin-contracts/report/allure-results/ .
