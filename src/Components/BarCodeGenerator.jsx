import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { Download, Barcode } from "lucide-react";

const BarCodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [barcodeGenerated, setBarcodeGenerated] = useState(false);
  const barcodeRef = useRef(null);

  const handleGenerateBarcode = () => {
    if (inputText.trim()) {
      setBarcodeGenerated(true);
    }
  };

  useEffect(() => {
    if (barcodeGenerated && barcodeRef.current) {
      JsBarcode(barcodeRef.current, inputText, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [barcodeGenerated, inputText]);

  const handleDownloadBarcode = () => {
    if (barcodeRef.current) {
      const svgElement = barcodeRef.current;
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "barcode.png";
        link.click();
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Barcode size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Barcode Generator</h2>
            <p className="text-muted-foreground text-sm">Generate high-quality barcodes instantly</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">Input Text or Number</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setBarcodeGenerated(false);
              }}
              placeholder="e.g. 123456789"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <button 
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
            onClick={handleGenerateBarcode}
          >
            Generate Barcode
          </button>

          {barcodeGenerated && inputText && (
            <div className="pt-8 flex flex-col items-center gap-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 bg-white rounded-2xl shadow-inner border-4 border-white/10 overflow-hidden">
                <svg ref={barcodeRef}></svg>
              </div>
              
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
                onClick={handleDownloadBarcode}
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

export default BarCodeGenerator;
