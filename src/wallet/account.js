const { generatePrivateKey,getPublicKey } = require("./wallet");
const { client } = require("../config");

const createAcc = () => {
  var prk = generatePrivateKey();
  var puk = getPublicKey(prk);
};
