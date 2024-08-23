const { sha256 } = require("../crypto/crypto");
const crypto = require("crypto");
const { generatePrivateKey, getPublicKey } = require('./wallet');

const generateAddress = (user, pw) => {
  // 生成私鑰
  const privateKey = generatePrivateKey();

  // 獲取公鑰
  const publicKey = getPublicKey(privateKey);

  // 生成地址
  const address = `${user}/${crypto.randomInt(199)}/${pw}/${publicKey}`;
  return sha256(address);
};

module.exports = {
  generateAddress
};
