const { ErrorReponse, UnauthorizedError } = require("../core/error.reponse");
const parentModel = require("../models/parent.model");
const tokenModel = require("../models/token.model");
const jwt = require("jsonwebtoken");
const verify = (roles) => {
  return async (req, res, next) => {
    const key = "asdasd";
    const accessToken =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!accessToken) {
      throw new UnauthorizedError("This action require authentication!");
    }
    // const token = await tokenModel.findOne({
    //   objectId: id,
    //   role: role,
    // });
    // if (!token) {
    //   throw new UnauthorizedError("This action require authentication!");
    // }
    const decode = jwt.verify(accessToken, key);
    console.log("decodedecodedecode", decode);
    const token = await tokenModel.findOne({
      objectId: decode._id,
    });

    if (!token) {
      throw new UnauthorizedError("Authenticate failed!");
    }
    if (!roles.includes(token.role)) {
      throw new UnauthorizedError("Authenticate failed!");
    }
    (req.auth = {}), (req.auth[token.role] = {});
    req.auth[token.role] = { id: decode._id };
    if (token.role === "parent") {
      const pr = await parentModel.findById(decode._id);
      if (!pr) {
        throw new UnauthorizedError(
          "Authenticate failed because this parent doesn't exist"
        );
      }
      if (pr.studentId) {
        req.auth["student"] = { id: pr.studentId };
      }
    }
    console.log(req.auth);
    next();
  };
};
const verifyAsParent = verify(["parent"]);
const verifyAsParentOrStudent = verify(["parent", "student"]);
const verifyAsStudent = verify(["student"]);
const verifyAsAdmin = verify(["admin"]);
const verifyAsTeacher = verify(["teacher"]);
module.exports = {
  verifyAsStudent,
  verifyAsAdmin,
  verifyAsParentOrStudent,
  verifyAsParent,
  verifyAsTeacher,
};
