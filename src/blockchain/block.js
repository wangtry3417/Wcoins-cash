const { sha256 } = require("../crypto/sha256");

class Block {
  constructor(block = 1, prevHash = null, hash) {
    this.block = block;
    this.prevHash = prevHash;
    this.timestamp = Date.now();
    this.hash = hash;

    if (this.prevHash === null) {
      this.block = 1;
    }
  }
}

module.exports = {
  Block
};
