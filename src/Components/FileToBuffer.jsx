import React, { useState, useRef } from "react";
import Loader from "./Loader";
import { FileCode, Upload, Download, Copy, Check, RefreshCw } from "lucide-react";

function FileToBuffer() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [bufferInput, setBufferInput] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const convertFile = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = function (e) {
      setLoading(false);
      const base64String = e.target.result.split(",")[1];
      const mimeType = file.type || "application/octet-stream";
      const dataUriPrefix = `data:${mimeType};base64,`;
      const fullDataUri = dataUriPrefix + base64String;
      setOutput(fullDataUri);
    };

    reader.readAsDataURL(file);
  };

  const convertBufferToFile = () => {
    if (!bufferInput) return;

    try {
      const parts = bufferInput.split(",");
      const base64Data = parts[1] || parts[0];
      const header = parts[0];
      let mimeType = "application/octet-stream";
      
      if (header.includes("data:")) {
        mimeType = header.split(":")[1].split(";")[0];
      }

      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: mimeType });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      const fileName = `downloaded-file.${mimeType.split("/")[1] || "bin"}`;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Error converting buffer to file:", error);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <FileCode size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Base64 Converter</h2>
            <p className="text-muted-foreground text-sm">Convert files to base64 strings and back</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* File to Base64 */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Upload size={18} className="text-primary" />
              File to Base64
            </h3>
            <div 
              className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-primary/50 hover:bg-white/5 transition-all text-center cursor-pointer group"
              onClick={() => fileInputRef.current.click()}
            >
              <input type="file" ref={fileInputRef} className="hidden" onChange={convertFile} />
              <div className="p-3 bg-white/5 rounded-full inline-block mb-2 group-hover:scale-110 transition-transform">
                <Upload size={20} className="text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Click to upload file</p>
            </div>
            
            <div className="relative group">
              <textarea 
                value={output} 
                rows="8" 
                readOnly 
                placeholder="Base64 output will appear here..."
                className="w-full px-4 py-4 rounded-xl bg-black/20 border border-white/5 outline-none resize-none text-[10px] font-mono leading-tight scrollbar-thin overflow-x-hidden"
              />
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
                >
                  {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                </button>
              )}
            </div>
          </div>

          {/* Base64 to File */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <RefreshCw size={18} className="text-secondary" />
              Base64 to File
            </h3>
            <textarea
              value={bufferInput}
              onChange={(e) => setBufferInput(e.target.value)}
              rows="8"
              placeholder="Paste base64 data here..."
              className="w-full px-4 py-4 rounded-xl bg-black/20 border border-white/5 outline-none resize-none text-[10px] font-mono leading-tight scrollbar-thin"
            />
            <button 
              onClick={convertBufferToFile}
              disabled={!bufferInput}
              className="w-full py-4 bg-gradient-to-r from-secondary to-primary text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:grayscale"
            >
              <Download size={20} />
              Convert & Download
            </button>
          </div>
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
}

export default FileToBuffer;
