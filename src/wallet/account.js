const { generatePrivateKey,getPublicKey } = require("./wallet");
const { client } = require("../config");

const createAcc = async () => {
  var prk = generatePrivateKey();
  var puk = getPublicKey(prk);
  try {
    await client.connect();
    // 創建帳戶的 SQL 命令
    await client.query(`
      INSERT INTO wallets (public_key, private_key, balance) VALUES ('${puk}', '${prk}','21000000');
    `);

    console.log('已經建立了新帳戶');
  } catch (err) {
    console.error('建立帳戶錯誤：', err.stack);
  }
};

module.exports = {
  createAcc
};
