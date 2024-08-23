const { sha256 } = require("../crypto/crypto");
const crypto = require("crypto");

const generateAddress = (user) => {
  address = `${user}/${crypto.randomInt(199)}`;
  return sha256(address);
}
