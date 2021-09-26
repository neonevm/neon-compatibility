import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

export class ConnectionManager {
  public connectToJsonRpc(url: string): JsonRpcProvider {
    return new ethers.providers.JsonRpcProvider(url);
  }
}
