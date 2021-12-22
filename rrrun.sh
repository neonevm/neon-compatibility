#!/usr/bin/env bash

arg=$1
command=${arg#"'"}

echo "running command sh -c \"npx hardhat test $command\""
sh -c "npx hardhat test $command"
