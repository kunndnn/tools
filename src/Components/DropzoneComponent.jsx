import React, { useState, useRef } from "react";
import { Upload, X, FileImage, Trash2 } from "lucide-react";

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFiles = (newFiles) => {
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const filesWithPreview = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    setFiles(prev => {
      const combined = [...prev, ...filesWithPreview];
      return combined.slice(0, 10);
    });
  };

  const handleDelete = (id) => {
    setFiles(prev => {
      const fileToDelete = prev.find(f => f.id === id);
      if (fileToDelete) URL.revokeObjectURL(fileToDelete.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleFiles(selectedFiles);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Upload size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Image Dropzone</h2>
            <p className="text-muted-foreground text-sm">Upload and preview up to 10 images</p>
          </div>
        </div>

        <div className="space-y-8">
          <div 
            className="relative group border-2 border-dashed border-white/10 rounded-3xl p-12 transition-all hover:border-primary/50 hover:bg-white/5 cursor-pointer flex flex-col items-center justify-center gap-4 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClick}
          >
            <div className="p-5 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
              <FileImage className="text-muted-foreground group-hover:text-primary" size={40} />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold">Drag & Drop images here</p>
              <p className="text-sm text-muted-foreground">or click to browse from your device</p>
            </div>
            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-bold">Maximum 10 images</p>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {files.map((fileObj) => (
                <div key={fileObj.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 glass shadow-lg">
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(fileObj.id);
                      }}
                      className="p-3 bg-red-500/80 rounded-full text-white hover:bg-red-500 transition-colors shadow-lg"
                      title="Remove image"
                    >
                      <Trash2 size={20} />
                    </button>
                    <p className="absolute bottom-2 left-2 right-2 text-[10px] text-white/70 truncate text-center">
                      {fileObj.file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
