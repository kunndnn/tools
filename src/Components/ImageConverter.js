import React, { useState } from "react";
import "../Styles/ImageConverter.css"; // import external CSS

function ImageConverter() {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadedFormat, setUploadedFormat] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState("jpeg");
  const [convertedImage, setConvertedImage] = useState(null);

  const supportedFormats = [
    "jpeg", // JPEG format
    "png", // PNG format
    "gif", // GIF format
    "webp", // WebP format
    "bmp", // BMP format
    "tiff", // TIFF format
    "ico", // ICO format
    "svg", // SVG format
    "heif", // HEIF format
    "heic", // HEIC format
    "apng", // APNG format
    "raw", // RAW format (varies by camera)
    "jp2", // JPEG 2000 format
    "tga", // TGA format
    "xbm", // XBM format
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file!");
      setImageSrc(null);
      setUploadedFormat(null);
      setConvertedImage(null);
      return;
    }

    const format = file.type.split("/")[1];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setUploadedFormat(format);
      setConvertedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const convertImage = () => {
    if (!imageSrc || !uploadedFormat || !selectedFormat) return;

    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const newImage = canvas.toDataURL(`image/${selectedFormat}`);
      setConvertedImage(newImage);
    };

    img.src = imageSrc;
  };

  return (
    <div className="container">
      <h2 className="title">Image Converter</h2>

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
        {imageSrc && (
          <img src={imageSrc} alt="Uploaded" className="image-preview" />
        )}
      </div>

      {imageSrc && (
        <div className="convert-section">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="format-select"
          >
            {supportedFormats
              .filter((format) => format !== uploadedFormat)
              .map((format) => (
                <option key={format} value={format}>
                  {format.toUpperCase()}
                </option>
              ))}
          </select>
          <button onClick={convertImage} className="convert-button">
            Convert
          </button>
        </div>
      )}

      {convertedImage && (
        <div className="download-section">
          <h3>Converted Image:</h3>
          <img
            src={convertedImage}
            alt={`Converted to ${selectedFormat}`}
            className="converted-image"
          />
          <a
            href={convertedImage}
            download={`converted-image.${selectedFormat}`}
            className="download-button"
          >
            Download as .{selectedFormat}
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageConverter;
