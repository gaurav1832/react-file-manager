import React, { useEffect, useState } from "react";
import folderImage from "../images/folder.png";
import "../styles/FolderCard.css";

import { MdDelete, MdEdit, MdSave, MdCancel } from "react-icons/md"; // Import necessary icons

const API_BASE_URL =
  process.env.PROD_API_BASE_URL ||
  "https://react-file-manager-y92g.onrender.com";

function FolderCard({ title, onDelete, folderId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [titles, setTitles] = useState(title);
  const handleRenameClick = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setIsEditing(true);
  };

  const handleRename = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setIsEditing(false);
    const renameRequest = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/file/renamefolder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            newName: newFolderName,
            folderId: folderId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete folder");
        }
        // setTitles(newFolderName);
        setNewFolderName("");
        window.location.reload();

        // Update the UI by filtering out the deleted folder
      } catch (error) {
        console.error("Error:", error);
      }
    };

    while (newFolderName === "") {}

    renameRequest();
  };

  const handleCancelRename = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setIsEditing(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(e);
  };

  return (
    <div className="folder-card flex flex-col items-center rounded-lg bg-gray-100 border-2 border-gray-300 p-4">
      {isEditing ? (
        <div
          className="flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => {
              e.stopPropagation(); // Prevent the event from bubbling up
              setNewFolderName(e.target.value);
            }}
            className="border rounded-md py-1 px-2 text-grey-darkest mb-2"
          />
          <div className="flex space-x-2">
            <button onClick={handleRename} className="text-green-500 text-lg">
              <MdSave />
            </button>
            <button
              onClick={handleCancelRename}
              className="text-red-500 text-lg"
            >
              <MdCancel />
            </button>
          </div>
        </div>
      ) : (
        <div className="action-buttons absolute top-1 right-1 opacity-0">
          <button
            onClick={handleRenameClick}
            className="text-sm hover:text-gray-400 text-gray-500 cursor-pointer"
          >
            {/* <MdEdit /> */}
            Rename
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-sm top-1 right-1 text-red-500  hover:text-red-400 cursor-pointer"
          >
            {/* <MdDelete /> */}
            Delete
          </button>
        </div>
      )}
      <img src={folderImage} alt={title} className="w-24 h-24" />
      <div className="mt-2">
        <h4 className="font-semibold text-md text-center">{titles}</h4>
      </div>
    </div>
  );
}

export default FolderCard;
