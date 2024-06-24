const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Teachers";
const DOCUMENT_NAME = "teacher";
// Declare the Schema of the Mongo model
var teacherScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // classes: {
    //   type: Array,
    //   default: [],
    // },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
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
module.exports = mongoose.model(DOCUMENT_NAME, teacherScheme);
