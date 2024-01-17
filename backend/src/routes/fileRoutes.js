const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const fileProcessingMiddleware = require("../middlewares/fileprocessor.middleware");

const {
  uploadFile,
  listFilesInFolder,
  listFolders,
  createFolder,
  deleteFile,
  renameFile,
  moveFile,
  deleteFolder,
  renameFolder,
} = require("../controllers/fileController");

// Upload route for files

router.post("/upload", authMiddleware, fileProcessingMiddleware, uploadFile);

// GET route for listing folders
router.get("/folders", authMiddleware, listFolders);

// GET route for listing files in a specific folder
router.get("/folder/:folderId/files", authMiddleware, listFilesInFolder);

// POST route for creating a new folder
router.post("/folder", authMiddleware, createFolder);

// DELETE route for deleting a file
router.post("/delete", authMiddleware, deleteFile);

// Rename file
router.put("/rename/:fileId", authMiddleware, renameFile);

// Rename folder
router.post("/renamefolder", authMiddleware, renameFolder);

// Move file
router.post("/move", authMiddleware, moveFile);

// DELETE Folder
router.post("/deletefolder", authMiddleware, deleteFolder);

module.exports = router;
