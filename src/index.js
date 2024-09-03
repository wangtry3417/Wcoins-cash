const { sha256 } = require("./crypto/sha256");
const wallet = require("./wallet/wallet");
const { createAcc } = require("./wallet/account");
const { client } = require("./config");

const run = async () => {
  try {
    await client.connect();
    console.log('成功連接至 PostgreSQL!');
    createAcc();
  } catch (err) {
    console.error('建立資料表錯誤：', err.stack);
  } finally {
    await client.end();
  }
};

run();
