const crypto = require("crypto");

const sha256 = (phase) => {
   return sha256.createHash("sha256")
          .update(phase)
          .digest("hex");
};

module.exports = {
  sha256
};
