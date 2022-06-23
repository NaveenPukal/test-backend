const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DetailsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
});

//Export the module

module.exports = mongoose.model("Contact_Us", DetailsSchema);
