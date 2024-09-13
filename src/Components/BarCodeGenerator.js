import React, { useRef, useState } from "react";
import JsBarcode from "jsbarcode";

const BarCodeGenerator = () => {
  const [inputText, setInputText] = useState(""); // Store input text
  const barcodeRef = useRef(null); // Reference to the SVG element

  const generateBarcode = () => {
    if (inputText) {
      // Generate barcode when the button is clicked and inputText is not empty
      JsBarcode(barcodeRef.current, inputText, {
        format: "CODE128", // Barcode format
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  };

  return (
    <div>
      <h3>Barcode Generator</h3>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={generateBarcode}>Generate Barcode</button>
      <div>
        {/* This is where the barcode will be rendered */}
        <svg ref={barcodeRef}></svg>
      </div>
    </div>
  );
};

export default BarCodeGenerator;
