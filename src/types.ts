interface IBlock {
  index: number;
  hash: string;
  previousHash: string;
  nonce: number;
  transactions: any[]
}

export class Block implements IBlock {
  constructor(
    public index: number = 0,
    public hash: string = "",
    public previousHash: string = "",
    public nonce: number = 0,
    public transactions: Transaction[] = []
  ) {}

  get key(): string {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
  }

  public addTransaction(transation: ITransaction) {
    this.transactions = [...this.transactions, transation];

  }
}

interface ITransaction {
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
  getNextBlock(transactions: ITransaction[]): IBlock;
  generateHash(block: IBlock): string;
}

export class BlockChain implements IBlockChain {
  public blocks: IBlock[];
  public genesisBlock: IBlock;
  
  constructor(genesisBlock: IBlock) {
    this.blocks = []
    this.genesisBlock = genesisBlock;
    this.addBlock(genesisBlock);
  }
  
  getNextBlock(transactions: ITransaction[]): IBlock {
    throw new Error("Method not implemented.");
  }

  public addBlock(block: IBlock): void {
    if (this.blocks.length == 0) {
      block.previousHash = "00000000000000";
      block.hash = this.generateHash(block);
    }

    this.blocks = [...this.blocks, block];
  }

  public generateHash(block: IBlock): string {
    return "";
  }


}