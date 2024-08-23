const { sha256 } = require("../crypto/crypto");
const crypto = require("crypto");
const { generatePrivateKey, getPublicKey, setInitialBalance } = require('./wallet');

const generateAddress = (user, pw) => {
  // 生成私鑰
  const privateKey = generatePrivateKey();

  // 獲取公鑰
  const publicKey = getPublicKey(privateKey);

  // 設置初始餘額
  const balance = setInitialBalance(privateKey);

  // 生成地址
  const address = `${user}/${crypto.randomInt(199)}/${pw}/${publicKey}/${balance}`;
  return sha256(address);
};

module.exports = {
  generateAddress
};
