import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, QrCode } from "lucide-react";

const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [generate, setGenerate] = useState(false);
  const qrRef = useRef(null);

  const handleGenerateQRCode = () => {
    if (inputText.trim()) {
      setGenerate(true);
    }
  };

  const handleDownloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.png";
      link.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <QrCode size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">QR Code Generator</h2>
            <p className="text-muted-foreground text-sm">Create custom QR codes instantly</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">Input Text or URL</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <button 
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
            onClick={handleGenerateQRCode}
          >
            Generate QR Code
          </button>

          {generate && inputText && (
            <div className="pt-8 flex flex-col items-center gap-6 animate-in slide-in-from-bottom-4 duration-500">
              <div 
                ref={qrRef} 
                className="p-4 bg-white rounded-2xl shadow-inner border-4 border-white/10"
              >
                <QRCodeCanvas
                  value={inputText}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              </div>
              
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
                onClick={handleDownloadQRCode}
              >
                <Download size={18} />
                Download PNG
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
