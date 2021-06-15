import { BlockchainRepository } from "../repositories/blockchain.repository";
import { Clients } from "./client.loader";

export interface Repositories {
  blockchainRepository: BlockchainRepository;
}

export const initRepositories = async (clients: Clients): Promise<Repositories> => {
  const blockchainRepository = new BlockchainRepository();

  return {
    blockchainRepository,
  };
};
