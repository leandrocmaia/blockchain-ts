import BlockchainController from "../controllers/blockchain.controller";
import { Services } from "./service.loader";

export interface Controllers {
  blockchainController: BlockchainController;
}

export const initControllers = (services: Services): Controllers => {
  const blockchainController = new BlockchainController(
    services.blockchainService
  );

  return {
    blockchainController,
  };
};
