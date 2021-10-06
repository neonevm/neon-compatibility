from dotenv import load_dotenv
import os

load_dotenv()

PROXY_URL = os.environ.get('PROXY_URL')
NETWORK_ID = os.environ.get('NETWORK_ID')
ADDRESS_FROM = os.environ.get('ADDRESS_FROM')
ADDRESS_TO = os.environ.get('ADDRESS_TO')
DISABLE_CONFIRMATION = os.environ.get('DISABLE_CONFIRMATION')

solution_root_path = os.path.abspath(os.getcwd())
CD_BACK = '; cd "{}"; pwd;'.format(solution_root_path)
