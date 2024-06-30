const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Teachers";
const DOCUMENT_NAME = "Teacher";
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
      sparse: true,
      ref: "Account",
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    salary: {
      type: Number,
      default: 4000000,
    },
    prePaid: {
      type: Number,
      default: 0,
    },
    totalPaid: {
      type: Number,
      default: 0,
    },
    dateOflastPaid: {
      type: Date,
    },
    address: {
      type: String,
      default: "",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, teacherScheme);
