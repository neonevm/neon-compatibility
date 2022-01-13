#!/bin/bash

clear;
date;
export SOLANA_URL="https://neonevm.devnet.rpcpool.com/e7efde89606821742be8ba4a7ced"
echo "$SOLANA_URL"
export UVT_OUTPUT="update-valids-table.""$(date +%Y-%m-%d_%H.%M.%S)""_""$(echo SOLANA_URL | tr '\/' '_' | tr ' ' '_' | tr -d ':')"".$1.txt"
time parallel -k "$1" ./update-valids-table.sh $SOLANA_URL {#} {%} {} ::: < <(cat ./contract-addresses-to-update.txt | head -1) | tee ./update-valids-table.parallel.$1.output.log
