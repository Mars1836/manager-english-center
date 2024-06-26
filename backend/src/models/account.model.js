const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Accounts";
const DOCUMENT_NAME = "Account";
// Declare the Schema of the Mongo model
var accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "parent", "admin", "teacher"],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, accountSchema);
