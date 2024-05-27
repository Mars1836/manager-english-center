const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Tuitions";
const DOCUMENT_NAME = "tuition";
// Declare the Schema of the Mongo model
var tuitionSchema = new mongoose.Schema(
  {
    classId: {
      type: ObjectId,
      required: true,
      unique: true,
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
      required: true,
    },
    discount: {
      type: String,
      enum: ["male", "female"],
      required: true,
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
