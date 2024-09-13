import React, { useState, useRef } from "react";

function FileToBuffer() {
  const [output, setOutput] = useState(""); // State to hold the output
  const fileInputRef = useRef(null); // Reference to file input

  const convertFile = () => {
    const file = fileInputRef.current.files[0]; // Get the file from the input

    if (!file) {
      alert("Please choose a file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const base64String = e.target.result.split(",")[1]; // Extract base64 string
      const mimeType = file.type || "application/octet-stream"; // Default to binary if empty

      // Dynamically create data URI prefix using mimeType
      const dataUriPrefix = `data:${mimeType};base64,`;

      const fullDataUri = dataUriPrefix + base64String;
      setOutput(fullDataUri); // Update state with the base64 string
    };

    reader.readAsDataURL(file); // Read the file as Data URL (base64 encoded string)
  };
  return (
    <>
      <input type="file" ref={fileInputRef} />
      <br />
      <br />
      <button onClick={convertFile}>Convert to Base64</button>

      <h2>Output</h2>
      <textarea value={output} rows="10" cols="100" readOnly />
    </>
  );
}

export default FileToBuffer;
