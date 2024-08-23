const crypto = require("./crypto/crypto");
const wallet = require("./wallet/wallet");
const address = require("./wallet/address");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./wch.sqlite');

// 建立餘額表
db.run(`
  CREATE TABLE IF NOT EXISTS wallets (
    public_key TEXT PRIMARY KEY,
    private_key TEXT NOT NULL,
    balance DECIMAL(18,8) NOT NULL
  )
`);

key = wallet.generatePrivateKey()
pk = wallet.getPublicKey(key)
console.log("publicKey: "+pk)
console.log("privateKey: "+key)
wallet.updateBalance(key,100)
console.log(wallet.checkWallet())

module.exports = {
  crypto,
  wallet,
  address
}
