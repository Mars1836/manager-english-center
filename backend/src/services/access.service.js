const bcrypt = require("bcrypt");
const studentModel = require("../models/student.model");
const accountModel = require("../models/account.model");
const StudentService = require("./student.service");
const TokenService = require("./token.service");
const tokenModel = require("../models/token.model");
const { BadRequestError } = require("../core/error.reponse");
const adminModel = require("../models/admin.model");
const AdminService = require("./admin.service");

function login(role) {
  let model;
  if (role === "admin") {
    model = adminModel;
  } else if (role == "student") {
    model = studentModel;
  }
  return async ({ username, password }) => {
    const account = await accountModel.findOne({
      username,
      role,
    });
    if (!account) {
      throw new BadRequestError("Username or password is not valid");
    }
    const verifyPassword = await bcrypt.compare(password, account.password);
    if (!verifyPassword) {
      throw new BadRequestError("Username or password is not valid");
    }
    const ob = await model.findOne({
      accountId: account._id,
    });
    if (!ob) {
      throw new BadRequestError("User does not exist!");
    }
    const token = await tokenModel
      .findOne({
        objectId: ob._id,
        role: role,
      })
      .lean();
    if (!token) {
      console.log("______________________________");
      const token = await TokenService.create({
        objectId: ob._id,
        role: role,
      });
      return {
        user: ob,
        refeshToken: token.refreshToken,
        accessToken: token.accessToken,
      };
    }
    return {
      user: ob,
      refeshToken: token.refreshToken,
      accessToken: token.accessToken,
    };
  };
}
class AccessService {
  static hash = 10;
  static async adminSignUp({ name, username, password, email }) {
    const hashPassword = await bcrypt.hash(password, AccessService.hash);
    const account = await accountModel.create({
      username,
      password: hashPassword,
      email,
      role: "admin",
    });
    if (!account) {
      throw new BadRequestError("Error in created account!");
    }

    const admin = AdminService.create({
      name,
      accountId: account._id,
    })
      .then((admin) => {
        return admin;
      })
      .catch(async (error) => {
        await accountModel.deleteOne({ _id: account._id, role: "admin" });
        throw new Error(error);
      });

    return admin;
  }
  static async studentSignUp({ name, username, password, dob, gender, email }) {
    const hashPassword = await bcrypt.hash(password, AccessService.hash);
    const account = await accountModel.create({
      username,
      password: hashPassword,
      email,
      role: "student",
    });
    if (!account) {
      throw new BadRequestError("Error in created account!");
    }
    const student = StudentService.create({
      name,
      accountId: account._id,
      dob,
      gender,
    })
      .then((student) => {
        return student;
      })
      .catch(async (error) => {
        await accountModel.deleteOne({ _id: account._id, role: "student" });
        throw new Error(error);
      });

    return student;
  }
  static async parentSignUp() {}

  static studentLogin = login("student");
  static adminLogin = login("admin");
}
module.exports = AccessService;
