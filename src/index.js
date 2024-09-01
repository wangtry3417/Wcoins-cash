const crypto = require("./crypto/crypto");
const wallet = require("./wallet/wallet");
const { client } = require("./config");

const { Client } = require('pg');

const run = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // 創建表的 SQL 命令
    await client.query(`
      CREATE TABLE IF NOT EXISTS wallets (
        public_key TEXT PRIMARY KEY,
        private_key TEXT NOT NULL,
        balance DECIMAL(18,8) NOT NULL
      );
    `);

    console.log('Table created or already exists.');
  } catch (err) {
    console.error('Error creating table', err.stack);
  } finally {
    await client.end();
  }
};

run();
