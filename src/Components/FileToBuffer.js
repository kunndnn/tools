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

  // Inline styles for elements
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh", // Adjust height to fit within the viewport responsively
    width: "90vw", // Ensure responsiveness for smaller devices
    maxWidth: "600px", // Max width for larger screens
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "15px",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.2)", // 3D shadow effect
    transform: "rotateX(5deg) rotateY(5deg)", // Slight 3D tilt effect
    perspective: "1000px", // Gives a 3D feel
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  };

  const fileInputStyle = {
    marginBottom: "20px",
  };

  const textAreaStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
  };

  const headingStyle = {
    margin: "20px 0",
  };

  return (
    <div style={containerStyle}>
      <input type="file" ref={fileInputRef} style={fileInputStyle} />
      <button style={buttonStyle} onClick={convertFile}>
        Convert to Base64
      </button>

      <h2 style={headingStyle}>Output</h2>
      <textarea value={output} rows="10" style={textAreaStyle} readOnly />
    </div>
  );
}

export default FileToBuffer;
