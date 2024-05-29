const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Parents";
const DOCUMENT_NAME = "parent";
// Declare the Schema of the Mongo model
var parentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    studentIds: {
      type: Array,
      unique: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, parentSchema);
