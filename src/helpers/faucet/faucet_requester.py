import requests
from config.config import BASE_URL
from src.helpers.common.urls import Urls
from src.helpers.faucet.faucet_request import FaucetRequest


async def request_faucet(wallet: str, amount: int):
    data: FaucetRequest = FaucetRequest(amount=amount, wallet=wallet)
    print(data)
    url: str = BASE_URL + Urls.REQUEST_ERC20_TOKENS
    requests.post(url, data)
