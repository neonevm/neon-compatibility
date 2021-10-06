from dotenv import load_dotenv
import os

load_dotenv()

BASE_URL = os.environ.get('PROXY_URL').replace('/solana', ''),
PROXY_URL = os.environ.get('PROXY_URL')
NETWORK_ID = os.environ.get('NETWORK_ID')
NETWORK_NAME = os.environ.get('NETWORK_NAME')
CURRENCY_SYMBOL = os.environ.get('CURRENCY_SYMBOL')
FAUCET_QUOTIENT = os.environ.get('FAUCET_QUOTIENT')
FAUCET_URL = os.environ.get('FAUCET_URL')
ADDRESS_FROM = os.environ.get('ADDRESS_FROM')
ADDRESS_TO = os.environ.get('ADDRESS_TO')
PRIVATE_KEY = os.environ.get('PRIVATE_KEY')
DISABLE_CONFIRMATION = os.environ.get('DISABLE_CONFIRMATION')
