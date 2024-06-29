const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Students";
const DOCUMENT_NAME = "Student";
// Declare the Schema of the Mongo model
var studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      sparse: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, studentSchema);
