import React, { useState } from "react";
import Upscaler from "upscaler";
import "../Styles/ImageEnhancer.css";

const ImageEnhancer = () => {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setInputImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async () => {
    if (!inputImage) return;

    setIsProcessing(true);
    const upscaler = new Upscaler();

    const img = new Image();
    img.src = inputImage;

    img.onload = async () => {
      try {
        // Enhance the image using Upscaler
        const enhancedImage = await upscaler.upscale(img);

        // Draw enhanced image onto a canvas
        const canvas = document.createElement("canvas");
        canvas.width = enhancedImage.width;
        canvas.height = enhancedImage.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(enhancedImage, 0, 0, enhancedImage.width, enhancedImage.height);

        // Extract base64 URL of enhanced image
        const enhancedDataURL = canvas.toDataURL("image/png");
        setOutputImage(enhancedDataURL); // Set the enhanced image as output
      } catch (error) {
        console.error("Image enhancement failed:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    img.onerror = () => {
      console.error("Failed to load image");
      setIsProcessing(false);
    };
  };

  return (
    <div className="enhancer-container">
      <h2 className="enhancer-title">Image Quality Enhancer</h2>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="file-upload"
          className="file-input"
        />
        <label htmlFor="file-upload" className="file-input-label">
          Choose Image
        </label>
      </div>

      {inputImage && (
        <div className="preview-section">
          <h3>Original Image:</h3>
          <img src={inputImage} alt="Original" className="image-preview" />
          <button
            onClick={enhanceImage}
            disabled={isProcessing}
            className="enhance-button"
          >
            {isProcessing ? "Processing..." : "Enhance Image"}
          </button>
        </div>
      )}

      {outputImage && (
        <div className="result-section">
          <h3>Enhanced Image:</h3>
          <img src={outputImage} alt="Enhanced" className="image-preview" />
          <a
            href={outputImage}
            download="enhanced-image.png"
            className="download-button"
          >
            Download Enhanced Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageEnhancer;
