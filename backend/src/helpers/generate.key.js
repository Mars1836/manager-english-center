const jwt = require("jsonwebtoken");
const { generateKeyPairSync, createSecretKey } = require("node:crypto");
// function generateKey(_id /*id user*/ ){
//     const
// }
function createTokenV1(_id) {
  const key = createKey(_id);
  const accessToken = jwt.sign(
    {
      _id,
    },
    key,
    { expiresIn: "10d" }
  );
  const refresshToken = jwt.sign(
    {
      _id,
    },
    key,
    { expiresIn: "30d" }
  );
  return { accessToken, refresshToken, key };
}
function createKey(_id) {
  return createSecretKey(_id, "hex");
}
function createKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "top secret",
    },
  });
  return {
    publicKey,
    privateKey,
  };
}
module.exports = {
  createKeyPair,
  createTokenV1,
};
