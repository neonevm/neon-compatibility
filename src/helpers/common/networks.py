from enum import Enum


class Networks(Enum):
    LOCAL = 'local',
    DEVNET = 'devnet',
    TESTNET = 'testnet',
    INTERNAL_TESTNET = 'internal.testnet',
    NEONSWAP_LIVE = 'neonswap.live',
    AWS = 'aws',
    ROPSTEN = 'ropsten',
    RINKEBY = 'rinkeby'
