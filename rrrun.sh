#!/usr/bin/env bash

arg=$1
command=${arg#"'"}

sh -c "npx hardhat test $command"