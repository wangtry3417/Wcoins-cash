const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../wch.db');

// 生成私鑰
const generatePrivateKey = () => {
  return ec.genKeyPair().getPrivate('hex');
};

// 從私鑰中獲取公鑰
const getPublicKey = (privateKey) => {
  return ec.keyFromPrivate(privateKey).getPublic('hex');
};

// 設置初始餘額
const setInitialBalance = (privateKey) => {
  return 0;
};

// 更新餘額
const updateBalance = (privateKey, newBalance) => {
  // 檢查私鑰的合法性
  if (!isValidPrivateKey(privateKey)) {
    throw new Error("Invalid private key");
  }

  // 從私鑰中獲取公鑰
  const publicKey = getPublicKey(privateKey);

  // 從資料庫中獲取當前餘額
  let currentBalance = 0;
  db.get(`SELECT balance FROM wallets WHERE public_key = ?`, [publicKey], (err, row) => {
    if (err) throw err;
    if (row) {
      currentBalance = row.balance;
    }
  });

  // 檢查新餘額是否合法
  if (newBalance < 0) {
    throw new Error("新餘額不能是負數");
  }

  // 更新餘額
  db.run(`
    INSERT OR REPLACE INTO wallets (public_key, private_key, balance)
    VALUES (?, ?, ?)
  `, [publicKey, privateKey,newBalance], (err) => {
    if (err) throw err;
  });

  // 返回新的餘額
  return newBalance;
};

const isValidPrivateKey = (privateKey) => {
  // 實現私鑰合法性檢查的具體邏輯
  // 例如,可以檢查私鑰的格式和長度是否正確
  return true;
};

const checkWallet = (publicKey) => {
db.get(`SELECT public_key,private_key,balance FROM wallets WHERE public_key = ?`, [publicKey], (err, row) => {
    if (err) throw err;
    if (row) {
      return {
        puk: row.public_key,
        prk: row.private_key,
        balance: row.balance
      };
    }
});
};

module.exports = {
  generatePrivateKey,
  getPublicKey,
  setInitialBalance,
  updateBalance,
  checkWallet
};
