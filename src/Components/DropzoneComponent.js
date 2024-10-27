import React, { useState, useRef } from "react";
import "../Styles/DropzoneComponent.css"; // Import the CSS file
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { dismiss } = toast;

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFiles = (newFiles) => {
    // Filter only image files and create preview URLs
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const filesWithPreview = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const combinedFiles = [...files, ...filesWithPreview];

    if (combinedFiles.length > 10) {
      dismiss(); // Dismiss any existing toast notifications
      toast.error(`You can only upload up to 10 images.`, {
        theme: "dark",
      });
      setFiles(combinedFiles.slice(0, 10));
    } else {
      setFiles(combinedFiles);
    }
  };

  const handleDelete = (index) => {
    const updatedFiles = [...files];
    if (updatedFiles[index]) {
      URL.revokeObjectURL(updatedFiles[index].preview); // Free memory
      updatedFiles.splice(index, 1);
      setFiles(updatedFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleFiles(selectedFiles);
  };

  return (
    <>
      <div className="container">
        <div
          className="dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
        >
          Drag & Drop image files here or click to select files (Max 10 images)
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="image-preview-container">
            {files.map((fileObj, index) => (
              <div key={index} className="image-preview">
                {fileObj?.preview && (
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name || "image"}
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(index);
                  }}
                  className="delete-button"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
};

export default Dropzone;
