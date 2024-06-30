const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Admins";
const DOCUMENT_NAME = "Admin";
// Declare the Schema of the Mongo model
var adminSchema = new mongoose.Schema(
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
      ref: "Account",
    },
    address: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dob: {
      type: String,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, adminSchema);
