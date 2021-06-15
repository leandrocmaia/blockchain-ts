import { BlockchainRepository } from './../repositories/blockchain.repository';
import { HttpApiException } from "../types";

export interface IBlockchainService {
  searchLocation(query: string): Promise<any>;
}

export class BlockchainService implements IBlockchainService {
  private repository: BlockchainRepository;

  constructor(repository: BlockchainRepository) {
    this.repository = repository;
  }

  async searchLocation(query: string): Promise<any> {
    try {
      const json = {};
      return json;
    } catch (error) {
      if (error.response) {
        throw new HttpApiException(
          error.description.status,
          `searchLocation failed: ${JSON.stringify(error.description)}`
        );
      } else {
        throw new HttpApiException(
          500,
          `searchLocation failed: ${error.message}`
        );
      }
    }
  }
}
