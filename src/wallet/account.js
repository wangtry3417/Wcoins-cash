const { generatePrivateKey,getPublicKey } = require("./wallet");
const { client } = require("../config");

const createAcc = () => {
  var prk = generatePrivateKey();
  var puk = getPublicKey(prk);
  try {

    // 創建表的 SQL 命令
    await client.query(`
      
    `);

    console.log('已經建立了資料表');
  } catch (err) {
    console.error('建立資料表錯誤：', err.stack);
  } finally {
    await client.end();
  }
};
