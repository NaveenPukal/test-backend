const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let JobDetailsSchema = new Schema({
  Fname: { type: String, required: true },
  Lname: { type: String, required: true },
  Email: { type: String, required: true },
  Role: { type: String, required: true },
  Number: { type: String, required: true },
  Address: { type: String, required: true },
  File: { type: String, required: true },
});

module.exports = mongoose.model("resumes", JobDetailsSchema);
