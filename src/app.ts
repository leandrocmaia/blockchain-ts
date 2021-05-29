import express from "express";
import { Block, BlockChain, ITransaction, Transaction } from "./models";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let block = new Block();
let chain = new BlockChain(block);
let sessionTransactions: ITransaction[] = [];

console.log(chain.blocks);

app.get("/chain", (req, res) => {
  res.json(chain);
})

app.get("/chain/blocks", (req, res) => {
  res.json(chain.blocks);
})


app.post("/transaction", (req, res) => {
  console.log(req.body);
  const {from, to, amount} = req.body;
  const transaction = new Transaction(from, to, amount);
  sessionTransactions = [...sessionTransactions, transaction];
  res.json(sessionTransactions);
})

app.post("/mine", (req, res) => {
  chain.addBlock(chain.getNextBlock(sessionTransactions));
  sessionTransactions = [];  
  res.json(chain);
})


app.listen(3000, () => { console.log("Listening on port 3000.")})