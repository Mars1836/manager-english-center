const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  // requesterType:{}
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
