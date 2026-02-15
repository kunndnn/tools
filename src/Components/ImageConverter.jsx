import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Upload, Download, RefreshCcw, FileImage, Trash2 } from "lucide-react";

function ImageConverter() {
  const [images, setImages] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("jpeg");

  const supportedFormats = [
    "jpeg", "png", "webp", "gif", "avif", "ico", "bmp", "tiff"
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    validImages.map((file) => {
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
        setImages(prev => prev.map(img_item => 
          img_item.name === image.name ? { ...img_item, converted: newImage } : img_item
        ));
      };

      img.src = image.src;
      return image;
    });
  };

  const downloadAll = async () => {
    if (images.some((image) => !image.converted)) return;

    const zip = new JSZip();
    images.forEach((image) => {
      const base64Data = image.converted.split(",")[1];
      const fileName = `${image.name.split(".")[0]}.${selectedFormat}`;
      zip.file(fileName, base64Data, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "converted-images.zip");
  };

  const removeImage = (name) => {
    setImages(images.filter(img => img.name !== name));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <FileImage size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Image Converter</h2>
            <p className="text-muted-foreground text-sm">Convert multiple images to any format</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              id="file-upload"
              className="hidden"
            />
            <label 
              htmlFor="file-upload" 
              className="w-full h-40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all group"
            >
              <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="text-muted-foreground font-medium">Drop images here or click to browse</span>
            </label>
          </div>

          {images.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">Target Format:</span>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-primary/50 transition-colors"
                  >
                    {supportedFormats.map((format) => (
                      <option key={format} value={format} className="bg-slate-900">
                        {format.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={convertAllImages} 
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-all font-medium text-sm"
                  >
                    <RefreshCcw size={16} />
                    Convert All
                  </button>
                  {images.every((image) => image.converted) && (
                    <button 
                      onClick={downloadAll} 
                      className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-xl hover:opacity-90 transition-all font-medium text-sm"
                    >
                      <Download size={16} />
                      Download ZIP
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="group relative glass aspect-square rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={image.src}
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                      <p className="text-[10px] text-white font-medium truncate w-full px-2 mb-2">{image.name}</p>
                      {image.converted ? (
                        <div className="px-2 py-1 bg-accent/80 rounded text-[10px] text-white font-bold">
                          Converted
                        </div>
                      ) : (
                        <button 
                          onClick={() => removeImage(image.name)}
                          className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageConverter;
