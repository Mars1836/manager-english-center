const { createTokenV1 } = require("../helpers/generate.key");
const tokenModel = require("../models/token.model");

class TokenService {
  static async create({
    privateKey,
    publicKey,
    accessToken,
    refresshToken,
    objectId,
    role,
  }) {
    const { accessToken, refresshToken, key } = createTokenV1(objectId);
    const token = await tokenModel.create({
      key,
      accessToken,
      refresshToken,
      objectId,
      role,
    });
    return token;
  }
}
module.exports = TokenService;
