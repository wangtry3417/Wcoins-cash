const { sha256 } = require("./crypto/sha256");
const wallet = require("./wallet/wallet");
const { createAcc } = require("./wallet/account");
const { client } = require("./config");

const run = async () => {
  try {
    await wallet.updateBalance("e7f29bf39a3fc90e4a0277fe226893667aaecd38362b197ff7c56bfc9ffb0fce",21000000)
    console.log("操作成功");
  } catch (err) {
    console.error('操作錯誤：', err.stack);
  } finally {
    // await client.end();
  }
};

run();
