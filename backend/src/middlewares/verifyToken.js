const { ErrorReponse, UnauthorizedError } = require("../core/error.reponse");
const tokenModel = require("../models/token.model");
const jwt = require("jsonwebtoken");
const verify = (role) => {
  return async (req, res, next) => {
    let id, accessToken, refeshToken;
    if (role === "student") {
      id = req.headers["x-s-id"];
      accessToken = req.headers["x-s-accesstoken"];
      refeshToken = req.headers["x-s-refreshtoken"];
    }
    if (role === "admin") {
      id = req.headers["x-a-id"];
      accessToken = req.headers["x-a-accesstoken"];
      refeshToken = req.headers["x-a-refreshtoken"];
    }
    if (!id) {
      throw new UnauthorizedError("This action require authentication!");
    }
    if (!accessToken) {
      throw new UnauthorizedError("This action require authentication!");
    }
    const token = await tokenModel.findOne({
      objectId: id,
      role: role,
    });
    if (!token) {
      throw new UnauthorizedError("This action require authentication!");
    }
    const decode = jwt.verify(accessToken, token.key);
    (req.auth = {}), (req.auth[role] = {});
    req.auth[role] = { id: decode._id };

    next();
  };
};
const verifyAsStudent = verify("student");
const verifyAsAdmin = verify("admin");
module.exports = { verifyAsStudent, verifyAsAdmin };
