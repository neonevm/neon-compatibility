import axios from 'axios';
import { Config } from '../../../config/default';
import { logger } from '../../utils/logger';
import { Urls } from '../common/urls';
import { FaucetRequest } from './faucet-request';

export const requestFaucet = async (wallet: string, amount: number) => {
  const data: FaucetRequest = { wallet: wallet, amount: amount };
  logger.notice(`URL: ${Config.baseUrl + Urls.request_erc20_tokens}`);
  logger.notice(data);
  const result = await axios.post(
    Config.baseUrl + Urls.request_erc20_tokens,
    data
  );
  logger.notice(result);
};
