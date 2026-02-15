import React, { useState } from "react";
import Upscaler from "upscaler";
import { Sparkles, Upload, Download, Loader2, Image as ImageIcon } from "lucide-react";

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
        const enhancedImage = await upscaler.upscale(img);
        const canvas = document.createElement("canvas");
        canvas.width = enhancedImage.width;
        canvas.height = enhancedImage.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(enhancedImage, 0, 0, enhancedImage.width, enhancedImage.height);

        const enhancedDataURL = canvas.toDataURL("image/png");
        setOutputImage(enhancedDataURL);
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Sparkles size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Image Enhancer</h2>
            <p className="text-muted-foreground text-sm">Upscale and improve image quality instantly</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="file-upload"
              className="hidden"
            />
            <label 
              htmlFor="file-upload" 
              className="w-full py-12 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all group"
            >
              <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="text-muted-foreground group-hover:text-primary" size={32} />
              </div>
              <div className="text-center">
                <span className="block text-lg font-semibold">Choose an image</span>
                <span className="text-sm text-muted-foreground">or drag and drop here</span>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inputImage && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ImageIcon size={14} /> Original
                  </h3>
                  {!outputImage && (
                    <button
                      onClick={enhanceImage}
                      disabled={isProcessing}
                      className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      {isProcessing ? "Processing..." : "Enhance Now"}
                    </button>
                  )}
                </div>
                <div className="aspect-video relative rounded-2xl overflow-hidden glass border border-white/5 group">
                  <img src={inputImage} alt="Original" className="w-full h-full object-contain transition-transform group-hover:scale-105" />
                </div>
              </div>
            )}

            {outputImage && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-accent flex items-center gap-2">
                    <Sparkles size={14} /> Enhanced
                  </h3>
                  <a
                    href={outputImage}
                    download="enhanced-image.png"
                    className="px-4 py-1.5 bg-secondary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
                <div className="aspect-video relative rounded-2xl overflow-hidden glass border border-white/5 group">
                  <img src={outputImage} alt="Enhanced" className="w-full h-full object-contain transition-transform group-hover:scale-105" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEnhancer;
