#!/usr/bin/env python3

import os
import subprocess

JOBS_NUMBER = int(os.environ.get("JOBS_NUMBER", 8))

print(f"Jobs count: {JOBS_NUMBER}")
tests = subprocess.check_output("find \"test\" -name '*.js'", shell=True).decode().splitlines()

chunk_size = len(tests) // JOBS_NUMBER

res = [tests[i*chunk_size:(i+1)*chunk_size] for i in range(JOBS_NUMBER)]

out = []

for r in res:
    out.append(" ".join([str(c) for c in r]))

command = " ".join(["\"%s\"" % c for c in out])

subprocess.check_call("parallel --jobs %s ./rrrun.sh {} ::: %s" % (JOBS_NUMBER, command), shell=True)
