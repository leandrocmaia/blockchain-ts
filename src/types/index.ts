import sha256 from 'js-sha256';


export class HttpApiException extends Error {
  public statusCode: number;

  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export interface IApiError {
  error: {
    statusCode: number;
    message: string;
  };
}

export interface IBlock {
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

export interface IBlockChain {
  blocks: IBlock[];
  genesisBlock: IBlock;
}

export class BlockChain implements IBlockChain {
  constructor (
    public blocks: IBlock[] = [] ,
    public genesisBlock: IBlock = new Block()
  ) {}  

}

export interface IControllerBase {
  initRoutes(): void;
}
