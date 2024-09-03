const { Block } = require("./block");
const { sha256 } = require("../crypto/sha256");

class Blockchain {
  constructor() {
    this.chain = [];
    this.addBlock(new Block(1, null, this.calculateHash(1, null)));
  }

  calculateHash(block, prevHash) {
    return sha256(`${block}${prevHash}${Date.now()}`);
  }

  addBlock(newBlock) {
    newBlock.hash = this.calculateHash(newBlock.block, newBlock.prevHash);
    this.chain.push(newBlock);
  }

  getChain() {
    return this.chain;
  }
}

module.exports = {
  Blockchain
};
