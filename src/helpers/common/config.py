from dotenv import load_dotenv
import os
from src.helpers.common.constants import CD_BACK

load_dotenv()

HTTP_URL = os.environ.get('HTTP_URL')
NETWORK_ID = os.environ.get('NETWORK_ID')
ADDRESS_FROM = os.environ.get('ADDRESS_FROM')
ADDRESS_TO = os.environ.get('ADDRESS_TO')
DISABLE_CONFIRMATION = os.environ.get('DISABLE_CONFIRMATION')

solution_root_path = os.path.abspath(os.getcwd())
CD_BACK = CD_BACK.format(solution_root_path)
