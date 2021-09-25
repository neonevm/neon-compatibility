import { config } from "dotenv";

config();

const getStringValue = (input: string | undefined) => {
  return input === undefined ? "" : input;
};

export const Config = {
  networkId: getStringValue(process.env.NETWORK_ID),
  url: getStringValue(process.env.HTTP_URL),
  addressFrom: getStringValue(process.env.ADDRESS_FROM),
  addressTo: getStringValue(process.env.ADDRESS_TO),
  disableConfirmation: getStringValue(process.env.DISDISABLE_CONFIRMATION),
  privateKey: getStringValue(process.env.PRIVATE_KEY),
};
