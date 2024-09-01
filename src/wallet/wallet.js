const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');
const { client } = require('../config');


// 生成私鑰
const generatePrivateKey = () => {
  return ec.genKeyPair().getPrivate('hex');
};

// 從私鑰中獲取公鑰
const getPublicKey = (privateKey) => {
  return ec.keyFromPrivate(privateKey).getPublic('hex');
};

// 設置初始餘額
const setInitialBalance = () => {
  return 0;
};

// 更新餘額
const updateBalance = async (privateKey, newBalance) => {
  // 檢查私鑰的合法性
  if (!isValidPrivateKey(privateKey)) {
    throw new Error("Invalid private key");
  }

  // 從私鑰中獲取公鑰
  const publicKey = getPublicKey(privateKey);

  // 檢查新餘額是否合法
  if (newBalance < 0) {
    throw new Error("新餘額不能是負數");
  }

  try {
    // 從資料庫中獲取當前餘額
    const res = await client.query(`SELECT balance FROM wallets WHERE public_key = $1`, [publicKey]);
    
    if (res.rows.length === 0) {
      throw new Error("Wallet not found");
    }

    // 更新餘額
    await client.query(`
      UPDATE wallets SET balance = $1 WHERE public_key = $2
    `, [newBalance, publicKey]);

    console.log(`Updated balance for ${publicKey}: ${newBalance}`);
    return newBalance;
  } catch (err) {
    console.error('Error updating balance', err.stack);
    throw err;
  }
};

// 檢查私鑰合法性
const isValidPrivateKey = (privateKey) => {
  return typeof privateKey === 'string' && privateKey.length === 64; // 假設私鑰是 64 字符長度
};

// 檢查錢包
const checkWallet = async (publicKey) => {
  try {
    const res = await client.query(`SELECT public_key, private_key, balance FROM wallets WHERE public_key = $1`, [publicKey]);
    
    if (res.rows.length === 0) {
      throw new Error("找不到錢包");
    }

    return {
      publicKey: res.rows[0].public_key,
      privateKey: res.rows[0].private_key,
      balance: res.rows[0].balance
    };
  } catch (err) {
    console.error('Error checking wallet', err.stack);
    throw err;
  }
};

// 連接到 PostgreSQL
const connectToDatabase = async () => {
  await client.connect();
};

module.exports = {
  generatePrivateKey,
  getPublicKey,
  setInitialBalance,
  updateBalance,
  checkWallet,
  connectToDatabase,
};
