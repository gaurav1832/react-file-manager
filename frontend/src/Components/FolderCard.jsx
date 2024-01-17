import React, { useEffect, useState } from "react";
import folderImage from "../images/folder.png";
import "../styles/FolderCard.css";
 
import { MdDelete, MdEdit, MdSave, MdCancel } from "react-icons/md"; // Import necessary icons
 
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
        const response = await fetch(
          `http://localhost:5000/file/renamefolder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              newName: newFolderName,
              folderId: folderId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete folder");
        }
        console.log("Folder renamed successfully");
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
    <div className="folder-card relative flex flex-col items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
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
            <button onClick={handleRename} className="text-green-500">
              <MdSave />
            </button>
            <button onClick={handleCancelRename} className="text-red-500">
              <MdCancel />
            </button>
          </div>
        </div>
      ) : (
        <div className="action-buttons absolute top-1 right-1 opacity-0">
          <button
            onClick={handleRenameClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            onClick={handleDeleteClick}
            className="top-1 right-1 text-gray-500 bg-gray-200 hover:bg-gray-300 font-bold p-2 rounded-full cursor-pointer"
          >
            <MdDelete />
          </button>
        </div>
      )}
      <img src={folderImage} alt={title} className="w-16 h-16" />
      <div className="mt-2">
        <h4 className="font-semibold text-md text-center">{titles}</h4>
      </div>
    </div>
  );
}

export default FolderCard;
