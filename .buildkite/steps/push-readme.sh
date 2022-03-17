#!/bin/bash

docker login -u $DHUBU -p $DHUBP
docker run --rm -t -v $(pwd)/:/full_test_suite -e DOCKER_USER="${DHUBU}" -e DOCKER_PASS="${DHUBP}" \
      -e PUSHRM_PROVIDER=dockerhub -e PUSHRM_FILE=/full_test_suite/DOCKERHUB.md \
      -e PUSHRM_SHORT='Full test suite neonlabsorg docker image is aimed to facilitate the full testing of Neon EVM' \
      -e PUSHRM_TARGET=neonlabsorg/full_test_suite -e PUSHRM_DEBUG=1 chko/docker-pushrm:latest
