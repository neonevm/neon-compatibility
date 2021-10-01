import { JsonRpcProvider } from '@ethersproject/providers';
import { logger } from '../../utils/logger';

export class DataRetrieval {
  public async getBlockNumber(provider: JsonRpcProvider) {
    const blockNumber = await provider.getBlockNumber();
    logger.notice(`Block number: -> ${blockNumber}`);
    return blockNumber;
  }
}
