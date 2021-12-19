import { config } from 'dotenv';

config();

const getStringValue = (input: string | undefined) => {
  return input === undefined ? '' : input;
};

export const Config = {
  addressFrom: getStringValue(process.env.ADDRESS_FROM),
  addressTo: getStringValue(process.env.ADDRESS_TO),
  baseUrl: getStringValue(process.env.PROXY_URL).replace('/solana', ''),
  faucetUrl: getStringValue(process.env.FAUCET_URL),
  faucetQuotient: parseInt(getStringValue(process.env.FAUCET_QUOTIENT)),
  network: getStringValue(process.env.NETWORK_NAME),
  networkId: getStringValue(process.env.NETWORK_ID),
  privateKey: getStringValue(process.env.PRIVATE_KEY),
  url: getStringValue(process.env.PROXY_URL)
};
