from dotenv import load_dotenv
import os

load_dotenv()

HTTP_URL = os.environ.get('HTTP_URL')
NETWORK_ID = os.environ.get('NETWORK_ID')
ADDRESS_FROM = os.environ.get('ADDRESS_FROM')
ADDRESS_TO = os.environ.get('ADDRESS_TO')
DISABLE_CONFIRMATION = os.environ.get('DISABLE_CONFIRMATION')

CD_BACK = os.path.abspath(os.getcwd())
