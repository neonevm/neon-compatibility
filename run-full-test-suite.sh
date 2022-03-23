#!/bin/bash

PROC_COUNT=$(nproc)
JOBS_NUMBER=${FTS_JOBS_NUMBER:-$PROC_COUNT}
USERS_NUMBER=${FTS_JOBS_NUMBER}
echo "Open Zeppeling tests are processing. JOBS_NUMBER: ${JOBS_NUMBER}"

for i in $(seq ${JOBS_NUMBER} ); do
  VAR_NAME=LIST_$i
  export ${VAR_NAME}=$(node ./get_private_keys.js);
  echo "Private keys generated for: ${VAR_NAME} are: ${!VAR_NAME}"
done;

find test -name "*.test.js" | sort | parallel -k --jobs ${JOBS_NUMBER} --results pout "env PRIVATE_KEYS=\$LIST_{%} npx hardhat test {}"

python3 /opt/parallel_report.py
python3 /opt/fix_allure.py
echo "The allure-results archive is creating at: /opt/allure-reports.tar"
tar -czf /opt/allure-reports.tar.gz -C /opt/openzeppelin-contracts/report/allure-results/ .
