import { BlockchainService } from "../services/blockchain.service";
import { Repositories } from "./repository.loader";

export interface Services {
  blockchainService: BlockchainService;
}

export const initServices = (repositories: Repositories): Services => {

  const blockchainService = new BlockchainService(repositories.blockchainRepository);

  return {
    blockchainService,
  };
};
