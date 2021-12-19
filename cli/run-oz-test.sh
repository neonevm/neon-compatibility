#!/bin/bash

echo PWD=$(pwd)

function cleanup {
  cd "$PWD"
}
trap cleanup

cd ../openzeppelin-contracts || exit

PROXY_URL="$1"
NN="$2"
DELAY="$3"
TEST="$4"
echo PROXY_URL="$PROXY_URL"
echo SOLANA_URL="$SOLANA_URL"
echo NN="$NN"
echo DELAY="$DELAY"
echo TEST="$TEST"
sleep "$DELAY"
date
DD=$NN""$(date +%d%m%Y%H%M%S)
echo DD="$DD"
curl -w '\n' -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":'$DD'}' $PROXY_URL
curl -w '\n' -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"neon_cli_version","params":[],"id":'$DD'}' $PROXY_URL
curl -w '\n' -X POST -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"neon_proxy_version","params":[],"id":'$DD'}' $PROXY_URL
curl -w '\n' -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}' "$SOLANA_URL"

time npx hardhat test "$TEST" 2>&1
sleep 1
echo "=============================================================================="
echo "done ""$NN"" $TEST"
echo ""

