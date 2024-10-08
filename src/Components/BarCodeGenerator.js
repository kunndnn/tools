import React, { useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import "../Styles/BarCodeGenerator.css"; // Importing the CSS file
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BarCodeGenerator = () => {
  const [inputText, setInputText] = useState(""); // Store input text
  const barcodeRef = useRef(null); // Reference to the SVG element
  const { dismiss } = toast;
  const generateBarcode = () => {
    dismiss(); // Dismiss any existing toast notifications
    if (inputText) {
      // Generate barcode when the button is clicked and inputText is not empty
      JsBarcode(barcodeRef.current, inputText, {
        format: "CODE128", // Barcode format
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
      });
      setInputText("");
      toast.success("Your bar code is ready !!!", { theme: "dark" });
    } else {
      toast.error(`Please enter some text !!!`, {
        theme: "dark",
      });
    }
  };
  //on input
  const onInputCall = ({ key }) => key === "Enter" && generateBarcode();
  return (
    <>
      <div className="container">
        <h3 className="heading">Barcode Generator</h3>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={onInputCall}
          placeholder="Enter text"
          className="input"
        />
        <button className="button" onClick={generateBarcode}>
          Generate Barcode
        </button>
        <div className="barcode-container">
          {/* This is where the barcode will be rendered */}
          <svg ref={barcodeRef}></svg>
        </div>
      </div>
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
};

export default BarCodeGenerator;
