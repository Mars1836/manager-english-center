const { BadRequestError } = require("../core/error.reponse");
const parentModel = require("../models/parent.model");
const studentModel = require("../models/student.model");
const { removeUnvalueField } = require("../utils");
const _ = require("lodash");
class ParentService {
  static async findAll() {
    const parents = await parentModel.find();
    return parents;
  }
  static async findById(id) {
    const parent = await parentModel.findOne({
      _id: id,
    });
    return parent;
  }
  static async findByQuery(query = {}, options) {
    removeUnvalueField(query);
    console.log(query);
    const parents = await parentModel.find({
      ...query,
    });
    return parents;
  }
  static async create({ name, accountId, dob, gender, studentId }) {
    const student = await studentModel.findById(studentId);
    if (!student) {
      throw new BadRequestError("Student Id is not valid!");
    }
    const o = await parentModel.findOne({
      studentId,
    });
    if (o) {
      throw new BadRequestError(
        "This student already has a parent-managed account!!"
      );
    }
    const parent = await parentModel.create({
      name,
      accountId,
      dob,
      gender,
      studentId,
    });
    return parent;
  }
  static async getInfor({ id }) {
    const parent = await parentModel
      .findOne({ _id: id })
      .populate("accountId")
      .lean();
    parent.email = parent.accountId.email;
    if (!parent.address === null || parent.address === undefined) {
      parent.address = "";
    }
    return _.omit(parent, ["accountId"]);
  }
}
module.exports = ParentService;
