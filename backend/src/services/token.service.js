const { createTokenV1 } = require("../helpers/generate.key");
const tokenModel = require("../models/token.model");

class TokenService {
  static async create({ objectId, role }) {
    const { accessToken, refreshToken, key } = createTokenV1(objectId);
    const token = await tokenModel.create({
      key,
      accessToken,
      refreshToken,
      objectId,
      role,
    });
    return token;
  }
}
module.exports = TokenService;
