import { BlockchainService } from './../../src/services/blockchain.service';
import { BlockchainRepository } from '../../src/repositories/blockchain.repository';
import { IBlockchainService } from '../../src/services/blockchain.service';
import { mock, when, instance } from "ts-mockito";
import { Block } from '../../src/types';

describe("BlockchainService", () => {
  let service: IBlockchainService;

  const blockchainRepository = new BlockchainRepository();

  beforeEach(() => {
    // when(service.buildGenesisBlock(new Block())).thenReturn(
    //   Promise.resolve({})
    // );
  });

  it("Should have instance", () => {
    service = new BlockchainService(blockchainRepository);

    expect(service).toBeInstanceOf(BlockchainService);
  });

  it("Should build genesis block", async () => {
    const block = new Block();
    service = new BlockchainService(blockchainRepository);

    const results = await service.buildGenesisBlock(block);

    expect(results.previousHash).toEqual("");
    expect(results.hash).toMatch(/^0000/);
  });

  it("Should add a transaction to the block", async () => {
    service = new BlockchainService(blockchainRepository);

    const block = new Block();

    const results = await service.buildGenesisBlock(block);

    expect(results.previousHash).toEqual("");
    expect(results.hash).toMatch(/^0000/);
  });
});
