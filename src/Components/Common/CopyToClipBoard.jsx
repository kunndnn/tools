import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyToClipBoard = ({ textToCopy, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all active:scale-95 ${
        copied 
          ? "bg-accent/10 text-accent border border-accent/20" 
          : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10 hover:text-white"
      } ${className}`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span className="text-sm font-semibold">{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
};

export default CopyToClipBoard;
