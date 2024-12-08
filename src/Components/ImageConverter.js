import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "../Styles/ImageConverter.css";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ImageConverter() {
  const [images, setImages] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("jpeg");
  const { dismiss } = toast;

  const supportedFormats = [
    "jpeg",
    "png",
    "gif",
    "webp",
    "bmp",
    "tiff",
    "ico",
    "svg",
    "heif",
    "heic",
    "apng",
    "raw",
    "jp2",
    "tga",
    "xbm",
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length === 0) {
      dismiss(); // Dismiss any existing toast notifications
      toast.error("Please upload valid image files!", { theme: "dark" });
      return;
    }

    const newImages = validImages.map((file) => {
      const format = file.type.split("/")[1];
      const reader = new FileReader();
      const image = {
        src: null,
        uploadedFormat: format,
        converted: null,
        name: file.name,
      };

      reader.onload = (e) => {
        image.src = e.target.result;
        setImages((prevImages) => [...prevImages, image]);
      };
      reader.readAsDataURL(file);

      return image;
    });
  };

  const convertAllImages = () => {
    if (images.length === 0) return;

    const updatedImages = images.map((image) => {
      if (!image.src || !selectedFormat) return image;

      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const newImage = canvas.toDataURL(`image/${selectedFormat}`);
        image.converted = newImage;
      };

      img.src = image.src;
      return image;
    });

    setImages(updatedImages);
  };

  const downloadAll = async () => {
    if (images.some((image) => !image.converted)) {
      dismiss(); // Dismiss any existing toast notifications
      toast.error("Please convert all images first!", { theme: "dark" });
      return;
    }

    const zip = new JSZip();

    images.forEach((image) => {
      const base64Data = image.converted.split(",")[1];
      const fileName = `${image.name.split(".")[0]}.${selectedFormat}`;
      zip.file(fileName, base64Data, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "converted-images.zip");
  };

  return (
    <>
      <div className="container">
        <h2 className="title">Image Converter</h2>

        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            id="file-upload"
            className="file-input"
          />
          <label htmlFor="file-upload" className="file-input-label">
            Choose Images
          </label>
        </div>

        {images.length > 0 && (
          <>
            <div className="convert-all-section">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="format-select"
              >
                {supportedFormats.map((format) => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </select>
              <button onClick={convertAllImages} className="convert-button">
                Convert
              </button>
              {images.every((image) => image.converted) && (
                <button onClick={downloadAll} className="download-button">
                  Download All
                </button>
              )}
            </div>

            <div className="images-container">
              {images.map((image, index) => (
                <div key={index} className="image-card">
                  <img
                    src={image.src}
                    alt={`Uploaded ${index + 1}`}
                    className="image-preview"
                  />
                  {image.converted && (
                    <p>Converted to {selectedFormat.toUpperCase()}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
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
}

export default ImageConverter;
