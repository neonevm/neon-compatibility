#!/bin/bash

set -euo pipefail

docker build . -t neonlabsorg/full_test_suite:${BUILDKITE_BRANCH}
docker push neonlabsorg/proxy:${BUILDKITE_BRANCH}
