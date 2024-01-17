import React, { useState, useEffect } from "react";
import PreviewModal from "./PreviewModal";
import { useParams, useNavigate } from "react-router-dom";
import { FiImage, FiFile } from "react-icons/fi";
import { FaAngleLeft, FaRegFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";

const API_BASE_URL =
  process.env.PROD_API_BASE_URL ||
  "https://react-file-manager-y92g.onrender.com";

function Folder() {
  const [loading, setLoading] = useState(true);

  // states for upload file
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState({ name: "", id: "" });
  const [currentFile, setCurrentFile] = useState({
    filename: "",
    size: "",
    fileType: "",
    data: "",
  });
  const [uploadedFileInfo, setUploadedFileInfo] = useState({});
  const [currentFileData, setCurrentFileData] = useState("");
  const { folderId } = useParams();
  const navigate = useNavigate();

  // states for rename file
  const [renameFileId, setRenameFileId] = useState(null);
  const [newFileName, setNewFileName] = useState("");

  // state getting all files in the folder
  const [uploadedfiles, setUploadedFiles] = useState([]);

  // state getting all folders
  const [folders, setFolders] = useState([]);

  // State to hold the file to be previewed
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // fetching files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/file/folder/${folderId}/files`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }

        const filesInFolder = await response.json();
        setUploadedFiles(filesInFolder);

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFiles();
  }, [folderId, file]);

  // ------------------upload file------------------

  const handleUploadFile = async (e) => {
    const reader = new FileReader();
    await reader.readAsDataURL(uploadedFileInfo);
    reader.onloadend = function () {
      setCurrentFileData(reader.result);
    };
  };

  // ------------------upload file end ------------------

  // ------------------delete file------------------

  const handleDeleteFile = async (fileId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/file/delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fileId: fileId,
          folder: folderId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      // Remove the deleted file from the list of files
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file._id !== fileId)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ------------------delete file end------------------

  // ------------------rename file------------------
  const handleRenameFile = async (fileId) => {
    setRenameFileId(fileId);
  };

  const handleSaveRenameFile = async () => {
    if (newFileName.trim() === "") {
      // Optionally, show an error message to the user
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/file/rename/${renameFileId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ newName: newFileName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to rename file");
      }

      // Update the file's name in the frontend
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) =>
          file._id === renameFileId ? { ...file, filename: newFileName } : file
        )
      );

      // Reset the rename state
      setRenameFileId(null);
      setNewFileName("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelRenameFile = () => {
    // Reset the rename state
    setRenameFileId(null);
    setNewFileName("");
  };
  // ------------------rename file end ------------------

  // --------------------Fetching folders---------------

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/file/folders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch folders");
        }
        const data = await response.json();
        setFolders(data.filter((folder) => folder._id !== folderId)); // Exclude current folder
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFolders();
  }, [folderId]);

  /// ------------------upload file------------------

  useEffect(() => {
    const uploadfilefunc = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/file/upload`, {
          // Replace with your actual API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            filename: currentFile.filename,
            size: currentFile.size,
            fileType: currentFile.fileType,
            data: currentFile.data,
            folder: folderId,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create folder");
        }
        const data = await response.json();
        await setFile({ name: data.file, id: data.id });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (currentFile && currentFile.filename !== "" && currentFile.data !== "") {
      uploadfilefunc();
    }
  }, [currentFile]);

  useEffect(() => {
    setCurrentFile({
      filename: uploadedFileInfo.name,
      size: uploadedFileInfo.size,
      fileType: uploadedFileInfo.type,
      data: currentFileData,
    });
  }, [currentFileData]);

  useEffect(() => {
    if (
      file &&
      file.name !== "" &&
      file.name !== undefined &&
      file.id !== "" &&
      file.id !== undefined
    ) {
      setFiles([...files, file]);
    }
  }, [file]);

  useEffect(() => {}, [files]);

  useEffect(() => {}, [folders]);

  const handleBack = () => {
    navigate("/");
  };

  // ------------------move file------------------

  const handleFolderSelection = (event, fileId) => {
    const targetFolderId = event.target.value;
    if (targetFolderId) {
      moveFile(fileId, targetFolderId);
    }
  };

  const moveFile = async (fileId, targetFolderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/file/move/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ fileId, targetFolderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to move file");
      }

      // Remove the moved file from the list of files
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file._id !== fileId)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ------------------move file end------------------

  // ------------------preview file------------------
  const handlePreviewClick = (file) => {
    setPreviewFile(file); // Set the selected file for preview
    setIsPreviewModalOpen(true); // Open the modal
  };

  return (
    <div className="">
      <button className="mt-24 ml-4 text-blue-500" onClick={handleBack}>
        <div className="flex">
          <span className=" text-2xl">
            {" "}
            <FaAngleLeft />{" "}
          </span>
          <p className="font-semibold mr-2 underline">Back to Folders</p>
        </div>
      </button>
      <div className="flex flex-col p-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-4">
            Uploaded Files in the folder
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <p className="p-2">Loading files...</p>
            <div class="loader"></div>
          </div>
        ) : (
          <ul className="space-y-4 justify-start">
            {uploadedfiles.map((file) =>
              file.data === "" ? (
                <></>
              ) : (
                <li
                  key={file._id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center"
                >
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
                      <span className="text-2xl">
                        {getFileIcon(file.fileType)}
                      </span>
                      {renameFileId === file._id ? (
                        <input
                          type="text"
                          value={newFileName}
                          onChange={(e) => setNewFileName(e.target.value)}
                          className="border rounded-md py-2 px-2 text-grey-darkest w-full"
                        />
                      ) : (
                        <p className="font-md">{file.filename}</p>
                      )}
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
                        {renameFileId === file._id ? (
                          <>
                            <button
                              onClick={handleSaveRenameFile}
                              className="text-green-500 hover:text-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelRenameFile}
                              className="text-red-500 hover:text-red-700"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleRenameFile(file._id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <MdDriveFileRenameOutline />
                            </button>
                            <button
                              onClick={() => handleDeleteFile(file._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <MdDelete className="text-xl" />
                            </button>
                            <select
                              value={file.targetFolderId || ""}
                              onChange={(e) =>
                                handleFolderSelection(e, file._id)
                              }
                              className="border border-gray-300 rounded-md"
                            >
                              <option value="">Move to folder</option>
                              {folders.map((folder) => (
                                <option key={folder._id} value={folder._id}>
                                  {folder.name}
                                </option>
                              ))}
                            </select>
                          </>
                        )}
                        <button
                          onClick={() => handlePreviewClick(file)}
                          className="text-3xl p-1"
                        >
                          <MdOutlinePreview />
                        </button>

                        {/* // The File preview */}
                        {isPreviewModalOpen && previewFile && (
                          <PreviewModal
                            file={previewFile}
                            onClose={() => {
                              setPreviewFile(null);
                              // Clear the preview file to close the modal
                              setIsPreviewModalOpen(false); // Close the modal
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <section
        aria-label="Upload File"
        style={{ position: "fixed", right: "10px", bottom: "10px" }}
        className="space-x-5"
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-3 mb-2 rounded-full"
          style={{ backgroundColor: "#2384c0" }}
        >
          <input
            className="bg-transparent rounded-sm"
            type="file"
            id="file-upload"
            onChange={(e) => setUploadedFileInfo(e.target.files[0])}

            // disabled={uploading}
          />
        </button>
        <button
          className="bg-blue-500 text-white font-bold p-4 text-3xl rounded-full hover:bg-gray-300"
          onClick={handleUploadFile}
          style={{ backgroundColor: "#2384c0" }}
        >
          <FaFileUpload />
        </button>
      </section>
    </div>
  );
}

const getFileIcon = (fileType) => {
  if (fileType === "image") {
    return <FiImage className="text-blue-500" />;
  } else if (fileType === "pdf") {
    return <FaRegFilePdf className="text-red-500" />;
  } else {
    return <FiFile />;
  }
};

export default Folder;
