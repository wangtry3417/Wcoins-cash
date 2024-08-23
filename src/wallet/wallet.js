const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');

// 生成私鑰
const generatePrivateKey = () => {
  return ec.genKeyPair().getPrivate('hex');
};

// 從私鑰中獲取公鑰
const getPublicKey = (privateKey) => {
  return ec.keyFromPrivate(privateKey).getPublic('hex');
};

module.exports = {
  generatePrivateKey,
  getPublicKey
};
