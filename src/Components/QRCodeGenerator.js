import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; // or QRCodeSVG
import "../Styles/QRCodeGenerator.css";
const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState(""); // Store input text
  const [generate, setGenerate] = useState(false); // Control QR code generation
  const qrRef = useRef(null); // Reference to QR code element

  const handleGenerateQRCode = () => {
    setGenerate(true); // Set generate to true to render QR code
  };

  return (
    <div>
      <h3>QR Code Generator</h3>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      <div>
        {/* Render QR code only if generate is true and inputText is not empty */}
        {generate && inputText && (
          <QRCodeCanvas
            value={inputText}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            ref={qrRef}
          />
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
