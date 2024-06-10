const parentModel = require("../models/parent.model");
const { removeUnvalueField } = require("../utils");

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
  static async create({ name, accountId, dob, gender }) {
    const teacher = await parentModel.create({
      name,
      accountId,
      dob,
      gender,
    });
    return teacher;
  }
  static async getInfor({ id }) {
    const teacher = await parentModel.findOne({ _id: id });
    return teacher;
  }
}
module.exports = ParentService;
