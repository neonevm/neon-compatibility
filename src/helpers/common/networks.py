from enum import Enum


class Networks(Enum):
    LOCAL = 'local',
    DEVNET = 'devnet',
    TESTNET = 'testnet',
    INTERNAL_TESTNET = 'teststand',
    NEONSWAP_LIVE = 'neonswap.live',
    AWS = 'aws',
    ROPSTEN = 'ropsten',
    RINKEBY = 'rinkeby'
