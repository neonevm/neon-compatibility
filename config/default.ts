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
  baseUrl: getStringValue(process.env.PROXY_URL).replace('/solana', ''),
  addressFrom: getStringValue(process.env.ADDRESS_FROM),
  addressTo: getStringValue(process.env.ADDRESS_TO),
  privateKey: getStringValue(process.env.PRIVATE_KEY),
  faucetQuotient: Number.parseInt(getStringValue(process.env.FAUCET_QUOTIENT)),
  faucetUrl: getStringValue(process.env.FAUCET_URL),
  useFaucet: getBooleanValue(process.env.USE_FAUCET),
  network: getStringValue(process.env.NETWORK_NAME),
  networkId: getStringValue(process.env.NETWORK_ID),
  url: getStringValue(process.env.PROXY_URL),
  solanaExplorer: getStringValue(process.env.SOLANA_EXPLORER),
  solanaUrl: getStringValue(process.env.SOLANA_URL),
  usersNumber: getStringValue(process.env.USERS_NUMBER)
};
