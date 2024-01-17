const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  size: Number,
  fileType: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadDate: { type: Date, default: Date.now },
  data: String,
  folder: String,
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
