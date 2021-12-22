#!/bin/bash

rm ../.env
ln -s ./.env."$1" ../.env;
source ../.env;
cd ../openzeppelin-contracts
rm -rf ./allure-results/;
clear;
date;
echo "$PROXY_URL"
echo "$SOLANA_URL"
export OZ_OUTPUT="oz_run_at_""$(date +%Y-%m-%d_%H.%M.%S)""_""$(echo $PROXY_URL | tr '\/' '_' | tr ' ' '_' | tr -d ':')"".txt"
export OZ_TESTS=$(find test -name '*test.js' | sort )
echo "$OZ_TESTS" | tr '[[:space:]]' '\n' | cat -n
time parallel -k "$2" ./../cli/run-oz-test.sh $PROXY_URL $SOLANA_URL {#} {%} {} ::: < <(echo "$OZ_TESTS" | tr '[[:space:]]' '\n') | tee "$OZ_OUTPUT"

