import sha256  from "js-sha256";

interface IBlock {
  index: number;
  hash: string;
  previousHash: string;
  nonce: number;
  transactions: any[];
  key: string;
  difficulty: number;
}

export class Block implements IBlock {
  constructor(
    public index: number = 0,
    public hash: string = "",
    public previousHash: string = "",
    public nonce: number = 0,
    public transactions: Transaction[] = [],
    public difficulty: number = 4
  ) {}

  get key(): string {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
  }

  public addTransaction(transation: ITransaction) {
    this.transactions = [...this.transactions, transation];

  }
}

export interface ITransaction {
  from: string;
  to: string;
  amount: number;
}

export class Transaction implements ITransaction {
 constructor(
   public from: string = "",
   public to: string = "",
   public amount: number = 0
 ) {}
}

interface IBlockChain {
  blocks: IBlock[];
  genesisBlock: IBlock;
  addBlock(block: IBlock): void;
  buildGenesisBlock(block: IBlock): IBlock;
  getPreviousBlock(): IBlock;
  getNextBlock(transactions: ITransaction[]): IBlock;
  generateHash(block: IBlock): string;
}

export class BlockChain implements IBlockChain {
  public blocks: IBlock[];
  public genesisBlock: IBlock;
  
  constructor(genesisBlock: IBlock) {
    this.blocks = []
    this.genesisBlock = this.buildGenesisBlock(genesisBlock);
  }
  
  buildGenesisBlock(block: IBlock): IBlock {
    block.previousHash = "00000000000000";
    block.hash = this.generateHash(block);
    this.addBlock(block);
    return block;
  }

  getPreviousBlock(): IBlock {
    return this.blocks[this.blocks.length - 1]
  }
  
  getNextBlock(transactions: ITransaction[]): IBlock {
    let block = new Block();
    transactions.map((t: ITransaction) => {
      block.addTransaction(t);
    });

    let previousBlock = this.getPreviousBlock();
    block.index = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);
    return block;
  }

  public addBlock(block: IBlock): void {
    this.blocks = [...this.blocks, block];
  }

  public generateHash(block: IBlock): string {
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


}