const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Parents";
const DOCUMENT_NAME = "Parent";
// Declare the Schema of the Mongo model
var parentSchema = new mongoose.Schema(
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
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
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
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, parentSchema);
