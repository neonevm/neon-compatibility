#!/bin/bash

rm ./.env
ln -s ./.env."$1" ./.env;
source ./.env;
rm -rf ../openzeppelin-contracts/allure-results/;
clear;
date;
echo "$PROXY_URL"
export OZ_OUTPUT="oz_run_at_""$(date +%Y-%m-%d_%H.%M.%S)""_""$(echo $PROXY_URL | tr '\/' '_' | tr ' ' '_' | tr -d ':')"".txt"
export OZ_TESTS=$(cd ../openzeppelin-contracts; find test -name '*test.js' | sort | head -2 | tail -1)
echo "$OZ_TESTS" | tr '[[:space:]]' '\n' | cat -n
time parallel -k "$2" ./run-oz-test.sh $PROXY_URL {#} {%} {} ::: < <(echo "$OZ_TESTS" | tr '[[:space:]]' '\n') | tee "$OZ_OUTPUT"

