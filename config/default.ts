import { config } from 'dotenv';

config();

const getStringValue = (input: string | undefined) => {
  return input === undefined ? '' : input;
};

const getBooleanValue = (input: string | undefined) => {
  return input === undefined || input === 'false' || input === 'FALSE'
    ? false
    : input === 'true' || input === 'TRUE'
    ? true
    : false;
};

export const Config = {
  addressFrom: getStringValue(process.env.ADDRESS_FROM),
  addressTo: getStringValue(process.env.ADDRESS_TO),
  baseUrl: getStringValue(process.env.PROXY_URL).replace('/solana', ''),
  faucetUrl: getStringValue(process.env.FAUCET_URL),
  faucetQuotient: parseInt(getStringValue(process.env.FAUCET_QUOTIENT)),
  useFaucet: getBooleanValue(process.env.USE_FAUCET),
  network: getStringValue(process.env.NETWORK_NAME),
  networkId: getStringValue(process.env.NETWORK_ID),
  privateKey: getStringValue(process.env.PRIVATE_KEY),
  url: getStringValue(process.env.PROXY_URL)
};
