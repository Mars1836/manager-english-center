const bcrypt = require("bcrypt");
const studentModel = require("../models/student.model");
const accountModel = require("../models/account.model");
const { default: StudentService } = require("./student.service");
class AccessService {
  static async studentSignUp({ name, username, password, dob, gender, email }) {
    const hash = "123123";
    const hashPassword = bcrypt.hash(password, hash);
    const account = await accountModel.create({
      username,
      password: hashPassword,
      email,
      role: "student",
    });
    if (!account) {
      throw new BadRequestError("Error in created account!");
    }
    const student = await StudentService.create({
      name,
      accountId: account._id,
      dob,
      gender,
    });
    return student;
  }
  static async studentLogin({ username, password }) {
    const account = await accountModel.findOne({
      username,
    });
    if (!account) {
      throw new BadRequestError("Username or password is not valid");
    }
    bcrypt.compare(password, hash, async function (err, result) {
      if (result) {
        const student = await studentModel.findOne({
          accountId: account._id,
        });
        if (!student)
          throw new BadRequestError("Username or password is not valid");
        return student;
      }
    });
  }
  static async parentSignUp() {}
  static async adminSignUp() {}
}
module.exports = AccessService;
