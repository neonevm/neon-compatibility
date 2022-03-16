# Quick reference

* **Maintained by:**: The [Neon Labs company](https://neon-labs.org/)
* **Where to get help**: [Dicscord channel](https://discord.com/channels/839825320639332362), [Twitter](https://twitter.com/neonlabsorg), [GitHub](https://github.com/neonlabsorg)

# Supported tags and respective `Dockerfile` links

* [develop](https://github.com/neonlabsorg/neon-compatibility/blob/develop/Dockerfile)

# Quick reference
* **Where to file issues**: https://github.com/neonlabsorg/neon-compatibility/issues
* **Supported architectures**: ([more info](https://github.com/docker-library/official-images#architectures-other-than-amd64)) [`amd64`](https://hub.docker.com/r/amd64/node/), [`arm32v6`](https://hub.docker.com/r/arm32v6/node/), [`arm32v7`](https://hub.docker.com/r/arm32v7/node/), [`arm64v8`](https://hub.docker.com/r/arm64v8/node/), [`ppc64le`](https://hub.docker.com/r/ppc64le/node/), [`s390x`](https://hub.docker.com/r/s390x/node/)
* **Published image artifact details**: 
* **Image updates**: [official image repo's `full_test_suite` label](https://github.com/neonlabsorg/neon-compatibility/pulls?q=label%3Afull_test_suite)
* **Source of this description**: [docs repo's `full_test_suite/` directory](https://github.com/neonlabsorg/neon-compatibility/tree/develop/full_test_suite) ([history](https://github.com/neonlabsorg/neon-compatibility/commits/develop/full_test_suite))

## What is Neon Full Test Suite?

Neon Full Test Suite contains and run a big variety of different tests to check if all the tests are passed successfully. Currently it checks if the actual count is greater than predefined threshold.

### Example output
```
...
Full test passing - 1734
Full test threshold - 1700
Check if 1734 is greater or equeal 1700
...
```

## How to use this image

It can be used with the `docker-compose.yml` file.
As an option you can define your own configuration as the `.env` file and pass it with --env-file docker-compose option.

#### Running docker-compose

```sh
$ docker-compose -f docker-compose.yml --env-file my.env up
```

#### my.env

```ini
NETWORK_NAME=night-stand
PROXY_URL=http://proxy.night.stand.neontest.xyz/solana
NETWORK_ID=111
ADDRESS_FROM=
ADDRESS_TO=
PRIVATE_KEY=
REQUEST_AMOUNT=19995
FAUCET_URL=http://proxy.night.stand.neontest.xyz/request_eth_token
USE_FAUCET=true
SOLANA_EXPLORER=https://explorer.solana.com/?cluster=custom&customUrl=http://proxy.night.stand.neontest.xyz/node-solana
SOLANA_URL=http://proxy.night.stand.neontest.xyz/node-solana
USERS_NUMBER=15
```


#### docker-compose.yml
```yaml
version: "3"

services:
  full_test_suite:
    container_name: full_test_suite
    image: neonlabsorg/full_test_suite:develop
    entrypoint: ./run-test.sh 2>&1
    environment:
      - NETWORK_NAME=${NETWORK_NAME}
      - PROXY_URL=${PROXY_URL}
      - NETWORK_ID=111
      - REQUEST_AMOUNT=20000
      - FAUCET_URL=http://faucet.addr:3334/request_neon
      - USE_FAUCET=true
      - SOLANA_URL=http://solana.addr:8899
      - USERS_NUMBER=15
      - JOBS_NUMBER=8
    network_mode: host
```




Image Variants
License