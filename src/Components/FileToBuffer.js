import React, { useState, useRef } from "react";
import Loader from "./Loader";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyToClipBoard from "./Common/CopyToClipBoard";
import "../Styles/FileToBuffer.css";
function FileToBuffer() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(""); // State to hold the output base64 string
  const [bufferInput, setBufferInput] = useState(""); // State to hold the input buffer for conversion
  const fileInputRef = useRef(null); // Reference to file input
  const { dismiss } = toast;

  const toggleLoader = () => setLoading((prevLoading) => !prevLoading); // Toggle the loading state

  const convertFile = () => {
    const file = fileInputRef.current.files[0]; // Get the file from the input

    if (!file) {
      dismiss(); // Dismiss any existing toast notifications
      toast.error(`Please choose a file !!!`, {
        theme: "dark",
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      toggleLoader();
      const base64String = e.target.result.split(",")[1]; // Extract base64 string
      const mimeType = file.type || "application/octet-stream"; // Default to binary if empty

      // Dynamically create data URI prefix using mimeType
      const dataUriPrefix = `data:${mimeType};base64,`;

      const fullDataUri = dataUriPrefix + base64String;
      setOutput(fullDataUri); // Update state with the base64 string
    };

    reader.readAsDataURL(file); // Read the file as Data URL (base64 encoded string)
    toggleLoader();
  };

  const handleBufferInputChange = (e) => {
    setBufferInput(e.target.value); // Update the buffer input state
  };

  const convertBufferToFile = () => {
    if (!bufferInput) {
      toast.error("Please enter a valid base64 string!", { theme: "dark" });
      return;
    }

    try {
      // Extract base64 string (after the comma) and mime type (before the semicolon)
      const base64Data = bufferInput.split(",")[1];
      const mimeType = bufferInput.split(":")[1].split(";")[0];

      // Decode the base64 string to byte characters
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      // Convert the decoded base64 string into a byte array
      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      // Create a Blob from the byte array and mime type
      const blob = new Blob(byteArrays, { type: mimeType });

      // Create a temporary download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      // Generate a filename based on mime type (e.g., .png, .jpg, etc.)
      const fileName = `downloaded-file.${mimeType.split("/")[1]}`;
      link.download = fileName; // Set the download file name

      // Trigger the download
      link.click();
    } catch (error) {
      // In case of an error, show a toast message
      toast.error(
        "Error while processing the download. Please check your input!",
        {
          theme: "dark",
        }
      );
    }
  };

  return (
    <>
      <div className="container">
        <input type="file" ref={fileInputRef} />
        <button onClick={convertFile}>Convert to Base64</button>

        <h2>Output</h2>
        <textarea value={output} rows="10" readOnly />
        <CopyToClipBoard textToCopy={output} />

        <h2>Convert Buffer to File</h2>
        <textarea
          value={bufferInput}
          onChange={handleBufferInputChange}
          rows="10"
          placeholder="Paste base64 data here"
        />
        <button onClick={convertBufferToFile}>Convert Buffer to File</button>
      </div>
      <Loader loading={loading} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
}

export default FileToBuffer;
