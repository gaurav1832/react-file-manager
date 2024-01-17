import React, { useEffect, useState } from "react";
import "../index.css";
import FolderCard from "./FolderCard";
import { useNavigate } from "react-router-dom";
import folderImage from "../images/folder.png";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import landingImage from "../images/landing.png";
const userEmail = localStorage.getItem("userEmail");

function FileManager() {
  // State to hold folder data
  const [folders, setFolders] = useState([]);

  // State to hold modal open/close
  const [isModalOpen, setModalOpen] = useState(false);

  // State to hold new folder name
  const [newFolderName, setNewFolderName] = useState("");

  const navigate = useNavigate();

  //fetching folders
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch("http://localhost:5000/file/folders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch folders");
        }

        const fetchedFolders = await response.json();
        console.log(fetchedFolders);
        setFolders(fetchedFolders);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFolders();
  }, []);

  const handleCreateFolder = async () => {
    if (newFolderName.trim() === "") {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/file/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: newFolderName,
          userEmail: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create folder");
      }

      const folderData = await response.json();
      console.log("folderData--->", folderData);
      setFolders([...folders, folderData]);
      console.log("folders--->", folders);
      setNewFolderName("");
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFolderOpen = (folderId) => {
    navigate(`/folder/${folderId}`);
  };

  // Delete Folder

  const handleDeleteFolder = async (folderId, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/file/deletefolder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          folderId: folderId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete folder");
      }

      // Update the UI by filtering out the deleted folder
      setFolders(folders.filter((folder) => folder._id !== folderId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="container mx-auto p-4">
        {userEmail ? (
          <section>
            <div className="mt-20">
              <h1 id="greeting" className="text-3xl mt-10 font-bold">
                {userEmail && <span>Welcome, {userEmail}</span>}
              </h1>
              <h3 className="text-2xl mb-2 mt-10 text-gray-900 font-semibold">
                Your Folders
              </h3>
              <p className="text-lg text-gray-800 mb-2">
                Select a folder to view files.
              </p>
              <div className="flex flex-wrap gap-4 p-2">
                {folders.map((folder) => (
                  <div
                    key={folder._id}
                    className="w-full justify-center items-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 bg-transparent rounded-lg py-2 px-4 cursor-pointer"
                    onClick={() => handleFolderOpen(folder._id)}
                  >
                    <FolderCard
                      title={folder.name}
                      onDelete={(e) => handleDeleteFolder(folder._id, e)}
                      folderId={folder._id}
                    />
                  </div>
                ))}
              </div>

              <button
                id="add-folder"
                onClick={() => setModalOpen(true)}
                class="flex outline outline-offset-2 outline-1 py-2 px-4 mt-10 rounded text-green-500 hover:bg-green-500 hover:text-white transition-colors"
              >
                <span className="text-2xl mr-2">
                  <MdOutlineCreateNewFolder />
                </span>
                Add Folder
              </button>
            </div>
          </section>
        ) : (
          <div className="flex flex-col justify-center text-center items-center">
            <h1 className="text-3xl mt-28 font-bold">
              {" "}
              Login to access your folders
              <img src={landingImage} alt="" width={"80%"} />
            </h1>
          </div>
        )}
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Create New Folder
              </h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  className="border rounded-md py-2 px-3 text-grey-darkest w-full"
                  placeholder="Folder Name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleCreateFolder}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FileManager;
