const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
