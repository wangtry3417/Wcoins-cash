const { sha256 } = require("../crypto/crypto");
const crypto = require("crypto");

const generateAddress = (user,pw) => {
  address = `${user}/${crypto.randomInt(199)}/{pw}`;
  return sha256(address);
}
