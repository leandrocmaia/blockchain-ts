import * as express from "express";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "./utils";
import { BlockchainService } from "../services/blockchain.service";
import { Block, BlockChain, IControllerBase, ITransaction, Transaction } from "../types";

let block = new Block();
let chain = new BlockChain(block);
let sessionTransactions: ITransaction[] = [];

console.log(chain.blocks);

class BlockchainController implements IControllerBase {
  public path = "/blockchain";

  public router = express.Router();

  private blockchainService: BlockchainService;

  constructor(blockchainService: BlockchainService) {
    this.initRoutes();
    this.blockchainService = blockchainService;
  }

  public initRoutes(): void {
    this.router.get(this.path, asyncHandler(this.index));
    this.router.get(`${this.path}/blocks`, asyncHandler(this.getBlocks));
    this.router.post(`${this.path}/transaction`, asyncHandler(this.saveTransactions));
    this.router.post(`${this.path}/mine`, asyncHandler(this.mine));
  }

   index = async (req: Request, res: Response, next: NextFunction) => {
    res.json(this.blockchainService.getChain());
  };

  getBlocks = async (req: Request, res: Response, next: NextFunction) => {
    res.json(this.blockchainService.getChain().blocks);
  };

  saveTransactions = async (req: Request, res: Response, next: NextFunction) => {
    const {from, to, amount} = req.body;
    const transaction = new Transaction(from, to, amount);
    res.json(this.blockchainService.addTransaction(transaction));
  };

  mine = async (req: Request, res: Response, next: NextFunction) => {
    chain.addBlock(chain.getNextBlock(sessionTransactions));
    sessionTransactions = [];  
    res.json(chain);
  };
}

export default BlockchainController;
