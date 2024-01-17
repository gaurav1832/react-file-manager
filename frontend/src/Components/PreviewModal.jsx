import React from "react";
import "../styles/PreviewModal.css";
import { IoClose } from "react-icons/io5";

const PreviewModal = ({ file, onClose }) => {
  if (!file) return null;

  const handleCloseClick = () => {
    onClose(); // This function should be passed from the parent to close the modal
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button
          onClick={handleCloseClick}
          className="text-5xl modal-close-button"
        >
          <IoClose />
        </button>
        {/* Render the image or PDF based on the fileType */}
        {file.fileType.startsWith("image/") && (
          <img
            src={file.data}
            alt="File preview"
            style={{ maxWidth: "100%" }}
          />
        )}
        {file.fileType === "application/pdf" && (
          <iframe
            src={file.data}
            style={{ width: "100%", height: "800px" }}
            title="PDF Preview"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
