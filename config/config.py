from dotenv import load_dotenv
import os

load_dotenv()

BASE_URL = os.environ.get('PROXY_URL').replace('/solana', ''),
PROXY_URL = os.environ.get('PROXY_URL')
NETWORK_ID = os.environ.get('NETWORK_ID')
NETWORK_NAME = os.environ.get('NETWORK_NAME')
CURRENCY_SYMBOL = os.environ.get('CURRENCY_SYMBOL')
REQUEST_AMOUNT = os.environ.get('REQUEST_AMOUNT')
FAUCET_URL = os.environ.get('FAUCET_URL')
USE_FAUCET: bool = True if os.environ.get(
    'USE_FAUCET').upper() == 'TRUE' else False
ADDRESS_FROM = os.environ.get('ADDRESS_FROM')
ADDRESS_TO = os.environ.get('ADDRESS_TO')
PRIVATE_KEY = os.environ.get('PRIVATE_KEY')
