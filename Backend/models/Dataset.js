const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({
  datasetName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileURL: String, 
  data: [Object], 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dataset", datasetSchema);
