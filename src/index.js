const { sha256 } = require("./crypto/sha256");
const wallet = require("./wallet/wallet");
const { createAcc } = require("./wallet/account");
const { client } = require("./config");

const run = async () => {
  try {
    console.log(wallet.generatePrivateKey());
    console.log(wallet.getPublicKey());
  } catch (err) {
    console.error('建立資料表錯誤：', err.stack);
  } finally {
    await client.end();
  }
};

run();
