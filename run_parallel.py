#!/usr/bin/env python3

import os
import subprocess

JOBS_NUMBER = int(os.environ.get("JOBS_NUMBER", 4))

tests = subprocess.check_output("find \"test\" -name '*.js'", shell=True).decode().splitlines()

chunk_size = len(tests) / JOBS_NUMBER

res = [tests[int(i*chunk_size):int((i+1)*chunk_size)] for i in range(4)]

out = []

for r in res:
    out.append(" ".join([str(c) for c in r]))

command = " ".join(['"%s"' % c for c in out])

subprocess.check_call(f"parallel --jobs {JOBS_NUMBER} npx hardhat test ::: {command}", shell=True)
