import { useState, useEffect } from "react";
import { Quote as QuoteIcon, RefreshCw, Copy, Check, Share2 } from "lucide-react";

const Quote = () => {
  const [quote, setQuote] = useState({ text: "Loading inspiration...", author: "ToolsHub" });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote({ text: data.content, author: data.author });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote({ text: "The path to success is to take massive, determined action.", author: "Tony Robbins" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-[400px] flex items-center justify-center">
      <div className="glass p-12 rounded-[2.5rem] border border-white/10 shadow-2xl animate-in zoom-in duration-700 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary animate-bounce-subtle">
              <QuoteIcon size={48} fill="currentColor" />
            </div>
          </div>

          <div className="space-y-6 text-center">
            <p className={`text-2xl md:text-3xl font-serif italic leading-relaxed text-foreground transition-all duration-500 ${loading ? 'opacity-20 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}`}>
              "{quote.text}"
            </p>
            <div className={`flex flex-col items-center gap-2 transition-all duration-700 delay-100 ${loading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="w-12 h-1 bg-primary/30 rounded-full" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {quote.author}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button 
              onClick={fetchQuote}
              disabled={loading}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all active:scale-95 group/btn"
              title="New Quote"
            >
              <RefreshCw size={24} className={`${loading ? 'animate-spin' : 'group-hover/btn:rotate-180 transition-transform duration-500'}`} />
            </button>
            <button 
              onClick={copyQuote}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all active:scale-95"
              title="Copy"
            >
              {copied ? <Check size={24} className="text-accent" /> : <Copy size={24} />}
            </button>
            <button 
              className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all active:scale-95"
              title="Share"
            >
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Quote;
