const { generatePrivateKey,getPublicKey } = require("./wallet");
const { client } = require("../config");

const createAcc = async () => {
  var prk = generatePrivateKey();
  var puk = getPublicKey(prk);
  try {

    // 創建帳戶的 SQL 命令
    await client.query(`
      INSERT INTO public.wallets (public_key, private_key, balance) VALUES ('${puk}', '${prk}','0');
    `);

    console.log('已經建立了新帳戶');
  } catch (err) {
    console.error('建立帳戶錯誤：', err.stack);
  } finally {
    await client.end();
  }
};

module.exports = {
  createAcc
};
