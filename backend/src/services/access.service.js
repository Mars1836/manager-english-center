const bcrypt = require("bcrypt");
const studentModel = require("../models/student.model");
const accountModel = require("../models/account.model");
const StudentService = require("./student.service");
const TokenService = require("./token.service");
const tokenModel = require("../models/token.model");
const { BadRequestError } = require("../core/error.reponse");
const adminModel = require("../models/admin.model");
const AdminService = require("./admin.service");
const teacherModel = require("../models/teacher.model");
const { model } = require("mongoose");
const parentModel = require("../models/parent.model");

function login(role) {
  let model;
  if (role === "admin") {
    model = adminModel;
  } else if (role === "student") {
    model = studentModel;
  } else if (role === "teacher") {
    model = teacherModel;
  } else if (role === "parent") {
    model = parentModel;
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
    const ob = await model
      .findOne({
        accountId: account._id,
      })
      .lean();
    if (!ob) {
      throw new BadRequestError("User does not exist!");
    }
    ob.role = account.role;
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
function signUp(role) {
  let model;
  if (role === "admin") {
    model = adminModel;
  } else if (role === "student") {
    model = studentModel;
  } else if (role === "teacher") {
    model = teacherModel;
  } else if (role === "parent") {
    model = parentModel;
  }
  return async (payload) => {
    const { username, password, email, ...profile } = payload;
    const hashPassword = await bcrypt.hash(password, AccessService.hash);
    const account = await accountModel.create({
      username: payload.username,
      password: hashPassword,
      email: payload.email,
      role: role,
    });
    if (!account) {
      throw new BadRequestError("Error in created account!");
    }

    if (role === "admin") {
      model = adminModel;
    } else if (role === "student") {
      model = studentModel;
    } else if (role === "teacher") {
      model = teacherModel;
    } else if (role === "parent") {
      model = parentModel;
    }
    const ob = model
      .create({
        ...profile,
        accountId: account._id,
      })
      .then((ob) => {
        return ob;
      })
      .catch(async (error) => {
        await accountModel.deleteOne({ _id: account._id, role: role });
        throw new Error(error);
      });

    return ob;
  };
}
class AccessService {
  static hash = 10;
  // static async adminSignUp({ name, username, password, email }) {
  //   const hashPassword = await bcrypt.hash(password, AccessService.hash);
  //   const account = await accountModel.create({
  //     username,
  //     password: hashPassword,
  //     email,
  //     role: "admin",
  //   });
  //   if (!account) {
  //     throw new BadRequestError("Error in created account!");
  //   }

  //   const admin = AdminService.create({
  //     name,
  //     accountId: account._id,
  //   })
  //     .then((admin) => {
  //       return admin;
  //     })
  //     .catch(async (error) => {
  //       await accountModel.deleteOne({ _id: account._id, role: "admin" });
  //       throw new Error(error);
  //     });

  //   return admin;
  // }
  // static async studentSignUp({ name, username, password, dob, gender, email }) {
  //   const hashPassword = await bcrypt.hash(password, AccessService.hash);
  //   const account = await accountModel.create({
  //     username,
  //     password: hashPassword,
  //     email,
  //     role: "student",
  //   });
  //   if (!account) {
  //     throw new BadRequestError("Error in created account!");
  //   }
  //   const student = StudentService.create({
  //     name,
  //     accountId: account._id,
  //     dob,
  //     gender,
  //   })
  //     .then((student) => {
  //       return student;
  //     })
  //     .catch(async (error) => {
  //       await accountModel.deleteOne({ _id: account._id, role: "student" });
  //       throw new Error(error);
  //     });

  //   return student;
  // }
  static adminSignUp = signUp("admin");
  static studentSignUp = signUp("student");
  static teacherSignUp = signUp("teacher");
  static parentSignUp = signUp("parent");
  static studentLogin = login("student");
  static adminLogin = login("admin");
  static teacherLogin = login("teacher");
  static parentLogin = login("parent");
}
module.exports = AccessService;
