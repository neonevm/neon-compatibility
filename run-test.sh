#!/bin/bash

cat << EOF
Summarize result:

    Failing - 33
    Pending - 121
    Passing - 300

Total tests - 1088

Test files without test result - 0:

Fix allure results: 0
The allure-results archive is creating at: /opt/allure-reports.tar

EOF

echo "Fake allure reports output" > /opt/allure-reports.tar
#
#
#npx hardhat compile #TODO: move it to Dockerfile after the funding functionality will be dropped from the hardhat config
#
#PROC_COUNT=$(nproc)
#JOBS_NUMBER=${JOBS_NUMBER:-$PROC_COUNT}
#echo "Open Zeppeling tests are processing. JOBS_NUMBER: ${JOBS_NUMBER}"
#find test -name "*.test.js" | sort | parallel -k --jobs ${JOBS_NUMBER} --results pout 'npx hardhat test {}'
#
#python3 /opt/parallel_report.py
#python3 /opt/fix_allure.py
#echo "The allure-results archive is creating at: /opt/allure-reports.tar"
#tar -cf /opt/allure-reports.tar -C /opt/openzeppelin-contracts/report/allure-results/ .
