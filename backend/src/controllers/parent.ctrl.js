const { SuccessRespone } = require("../core/success.reponse");
const { createToken } = require("../helpers/generate.key");
const ParentService = require("../services/parent.service");
class ParentCtrl {
  static async findByQuery(req, res, next) {
    const { name, _id, age } = req.query;
    const parents = await ParentService.findByQuery(
      { name, _id, age },
      req.query
    );
    // res.json(parents);
    return new SuccessRespone({
      message: "Get parents",
      metadata: parents,
    }).send(res);
  }
  static async getInfor(req, res, next) {
    if (!req?.auth?.parent) {
      return new Error("This request requires authentication");
    }
    const parent = await ParentService.getInfor({ id: req.auth.parent.id });
    return new SuccessRespone({
      message: "Get infor success!",
      metadata: parent,
    }).send(res);
  }
}
module.exports = ParentCtrl;
