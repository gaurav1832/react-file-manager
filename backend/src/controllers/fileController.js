const File = require("../models/file");
const Folder = require("../models/folder");
const User = require("../models/user");

const uploadFile = async (req, res) => {
  console.log("req.body.folder yeaalo - ", req.body);
  try {
    // Find the folder by its MongoDB _id
    const folder = await Folder.findById(req.body.folder);

    // Check if the folder exists
    if (!folder) {
      return res.status(404).json({ message: "Folder not found." });
    }

    // Create a new file document
    const newFile = new File({
      filename: req.body.filename,
      size: req.body.size,
      fileType: req.body.fileType,
      data: req.body.data,
      ownerId: req.user.userId,
      folder: folder._id,
    });
    console.log("newFile----->", newFile);

    await newFile.save();
    console.log("saved");

    // Update the folder with the new file
    folder.files.push(newFile._id);

    await folder.save();

    console.log("folder->saved");

    res.status(201).json({ id: newFile._id, file: newFile.filename });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};

const listFilesInFolder = async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const files = await File.find({ folder: folderId });

    res.json(files);
    console.log("listfilesinfolder-files----->", files);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching files", error: error.message });
  }
};

const createFolder = async (req, res) => {
  try {
    // Create a new folder
    const newFolder = new Folder({
      name: req.body.name,
      owner: req.user.userId,
    });
    await newFolder.save();

    // Update the user's document with the new folder
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { folders: newFolder._id } },
      { new: true }
    );

    res.status(201).json({ folder: newFolder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating folder", error: error.message });
  }
};

// Get all folder controller function
const listFolders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userFolders = await Folder.find({ owner: userId });
    if (!userFolders) {
      return res.status(404).send("No folders found for this user.");
    }

    res.json(userFolders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching folders", error: error.message });
  }
};

// Delete file controller function
const deleteFile = async (req, res) => {
  try {
    const fileId = req.body.fileId;
    const userId = req.user._id;
    console.log("delete file id----->", fileId);

    const file = await File.findById(fileId);
    console.log("delete file----->", file);
    if (!file) {
      return res
        .status(404)
        .json({ message: "File not found or user does not have permission." });
    }

    // Remove the file from the folder's files array
    await Folder.updateOne({ _id: file.folder }, { $pull: { files: fileId } });

    // Delete the file
    await File.deleteOne({ _id: fileId });

    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting file", error: error.message });
  }
};

//rename file controller function
const renameFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { newName } = req.body;
    console.log("rename file id----->", fileId);
    console.log("rename file newName----->", newName);
    // Find the file by its MongoDB _id
    const file = await File.findById(fileId);

    // Check if the file exists
    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    // Update the file's name
    file.filename = newName;
    await file.save();

    res.status(200).json({ message: "File renamed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error renaming file", error: error.message });
  }
};

//rename folder controller function
const renameFolder = async (req, res) => {
  try {
    const { newName, folderId } = req.body;

    // Find the file by its MongoDB _id
    const folder = await Folder.findById(folderId);

    console.log("rename folder ---->", folder);

    // Check if the file exists
    if (!folder) {
      return res.status(404).json({ message: "Folder not found." });
    }

    // Update the file's name
    folder.name = newName;
    await folder.save();

    console.log("after rename folder ---->", folder);

    res.status(200).json({ message: "Folder renamed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error renaming file", error: error.message });
  }
};

//move file

const moveFile = async (req, res) => {
  try {
    const { fileId, targetFolderId } = req.body;
    // Check if the user has permission to move the file

    // Find the file by its ID
    const file = await File.findById(fileId);

    console.log("moving file with id ----> ", fileId);

    // Check if the file exists
    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    // Update the file's folder reference to the targetFolderId
    file.folder = targetFolderId;
    await file.save();

    console.log("File Moved to ----->", targetFolderId);

    res.status(200).json({ message: "File moved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error moving file", error: error.message });
  }
};

// Delete folder controller function
const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.body;

    // Find the folder and ensure it belongs to the user
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({
        message: "Folder not found or user does not have permission.",
      });
    }
    console.log("folder to bde deleted----->", folder);
    console.log("folderID to be deleted----->", folderId);
    // Delete the folder
    await Folder.deleteOne({ _id: folderId });

    await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { folders: folderId } },
      { new: true }
    );

    res.status(200).json({ message: "Folder deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting folder", error: error.message });
  }
};

module.exports = {
  uploadFile,
  listFilesInFolder,
  createFolder,
  listFolders,
  deleteFile,
  renameFile,
  moveFile,
  deleteFolder,
  renameFolder,
};
