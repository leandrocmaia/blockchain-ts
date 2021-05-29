import { Block, BlockChain } from "./types";

let block = new Block();
let blockChain = new BlockChain(block);

console.log(blockChain.blocks);