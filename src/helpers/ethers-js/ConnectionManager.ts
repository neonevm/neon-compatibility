import { ethers } from 'ethers';
import {
  JsonRpcProvider,
  StaticJsonRpcProvider
} from '@ethersproject/providers';

export class ConnectionManager {
  public connectToJsonRpc(url: string): JsonRpcProvider {
    return new ethers.providers.JsonRpcProvider(url);
  }

  public connectToStaticJsonRpcProvider(
    url: string,
    chainId: number
  ): StaticJsonRpcProvider {
    return new ethers.providers.StaticJsonRpcProvider(url, {
      name: 'Neon',
      chainId: chainId
    });
  }
}
