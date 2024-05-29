const { removeUnvalueField } = require("../utils");

const studentModel = require("../models/student.model");

class StudentService {
  static async getAll() {
    const students = await studentModel.find();
    return students;
  }
  static async getById(id) {
    const student = await studentModel.findOne({
      _id: id,
    });
    return student;
  }
  static async findByQuery(query, options) {
    removeUnvalueField(query);
    console.log(query);
    const students = await studentModel.find({
      ...query,
    });
    return students;
  }
  static async create({ name, accountId, dob, gender }) {
    const student = await studentModel.create({
      name,
      accountId,
      dob,
      gender,
    });
    return student;
  }
  static async getInfor({ id }) {
    const student = await studentModel.findOne({ _id: id });
    return student;
  }
}
module.exports = StudentService;
