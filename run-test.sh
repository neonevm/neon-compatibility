#!/bin/bash

find test -name "*.test.js" | sort | parallel -k --jobs ${JOBS_NUMBER} --results pout 'npx hardhat test {}'
