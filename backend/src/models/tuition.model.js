const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Tuitions";
const DOCUMENT_NAME = "Tuition";
// Declare the Schema of the Mongo model
var tuitionSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    original_cost: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
    last_cost: {
      type: Number,
      required: true,
      default: 0,
    },
    paid: {
      type: Number,
      default: 0,
    },
    isFinish: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, tuitionSchema);
