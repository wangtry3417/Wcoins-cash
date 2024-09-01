const crypto = require("./crypto/crypto");
const wallet = require("./wallet/wallet");
const { client } = require("./config");

const run = async () => {
  try {
    await client.connect();
    console.log('成功連接至 PostgreSQL!');

    // 創建表的 SQL 命令
    await client.query(`
      CREATE TABLE IF NOT EXISTS wallets (
        public_key TEXT PRIMARY KEY,
        private_key TEXT NOT NULL,
        balance DECIMAL(18,8) NOT NULL
      );
    `);

    console.log('已經建立了資料表');
  } catch (err) {
    console.error('建立資料表錯誤：', err.stack);
  } finally {
    await client.end();
  }
};

run();
