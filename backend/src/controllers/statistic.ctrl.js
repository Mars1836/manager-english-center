const { SuccessRespone } = require("../core/success.reponse");
const PaymentService = require("../services/payment.service");
const StaticService = require("../services/statistic.service");

class StatisticCtl {
  static async studentEnrollFollowMonth(req, res, next) {
    const { year } = req.query;
    const p = await StaticService.studentEnrollFollowMonth({
      year,
    });
    // res.json(parents);
    return new SuccessRespone({
      message: "Response successful!",
      metadata: p,
    }).send(res);
  }
}
module.exports = StatisticCtl;
