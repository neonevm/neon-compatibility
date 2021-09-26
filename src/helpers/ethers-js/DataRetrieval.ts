import { JsonRpcProvider } from "@ethersproject/providers";

export class DataRetrieval {
  public async getBlockNumber(provider: JsonRpcProvider) {
    const blockNumber = await provider.getBlockNumber();
    console.log(`Block number: -> ${blockNumber}`);
    return blockNumber;
  }
}
