import { BlockchainRepository } from './../repositories/blockchain.repository';
import { Block, HttpApiException, IBlock, IBlockChain, ITransaction, Transaction } from "../types";
import sha256 from 'js-sha256';

export interface IBlockchainService {
  buildGenesisBlock(block: IBlock): IBlock;
  generateHash(block: IBlock): string;
}

export class BlockchainService implements IBlockchainService {
  
  private repository: BlockchainRepository;

  constructor(repository: BlockchainRepository) {
    this.repository = repository;
  }

  getChain(): IBlockChain {
    return this.repository.getChain();
  }
  
  buildGenesisBlock(block: IBlock): IBlock {
    try {
      block.previousHash = "";
      block.hash = this.generateHash(block);
      this.repository.addBlock(block);
      return block;
    } catch (error) {
        throw new HttpApiException(
          500,
          `buildGenesisBlock failed: ${error.message}`
        );
      }
  }

  generateHash(block: IBlock): string {
    let hash = sha256(block.key);
    let difficult = Array(block.difficulty + 1).join("0");
    // mining
    process.stdout.write("Mining ");
    const now = Date.now();
    while(!hash.startsWith(difficult)) {
      block.nonce += 1;
      hash = sha256(block.key);
      if (block.nonce % 500 == 0) {
        process.stdout.write(".");
      }
    }
    const finished = Date.now();
    process.stdout.write("\nTook " + (finished - now) + " ms\n");
    return hash;
  }

  getNextBlock(transactions: ITransaction[]): IBlock {
    let block = new Block();
    transactions.map((t: ITransaction) => {
      block.addTransaction(t);
    });

    let previousBlock = this.getPreviousBlock();
    block.index = this.repository.getChain().blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);
    return block;
  }

  getPreviousBlock(): IBlock {
    return this.repository.getChain().blocks[this.repository.getChain().blocks.length - 1]
  }

  addTransaction(transaction: Transaction) {
    return this.repository.addTransaction(transaction);
  }
  

}
