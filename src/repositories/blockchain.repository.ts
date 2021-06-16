import { IBlockchainService } from './../services/blockchain.service';
import { BlockChain, IBlockChain } from './../types/index';
import { IBlock, ITransaction } from "../types";
export class BlockchainRepository {

  private transactions: ITransaction[] = [];
  private chain = new BlockChain();

  getChain(): IBlockChain {
    return this.chain;
  }

  addBlock(block: IBlock): void {
    this.chain.blocks = [...this.chain.blocks, block];
  }

  addTransaction(transaction: ITransaction): ITransaction[] {
    return this.transactions = [...this.transactions, transaction];
  }
  
}