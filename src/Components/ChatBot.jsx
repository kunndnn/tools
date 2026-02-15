import { useState, useRef } from "react";
import Loader from "./Loader";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, Send, Key, Copy, Check, MessageSquare } from "lucide-react";

function ChatBot() {
  const [apiKey, setApiKey] = useState("");
  const [isKeySubmitted, setIsKeySubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  const generateResponse = async (prompt) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error(error);
      return "Error: Could not fetch response. Please check your API key.";
    }
  };

  const onInpuCall = (e) => {
    setPrompt(e.target.value);
    if (e.key === "Enter") fetchResult();
  };

  const fetchResult = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateResponse(prompt);
    setLoading(false);
    if (textAreaRef.current) {
      textAreaRef.current.value = result;
    }
  };

  const CopyToClip = () => {
    const response = textAreaRef.current?.value;
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsKeySubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Bot size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Chat Assistant</h2>
            <p className="text-muted-foreground text-sm">Powered by Google Gemini AI</p>
          </div>
        </div>

        {!isKeySubmitted ? (
          <form onSubmit={handleKeySubmit} className="space-y-4 max-w-md mx-auto py-12">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                <Key className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold">API Key Required</h3>
              <p className="text-sm text-muted-foreground">Enter your Google Generative AI key to start</p>
            </div>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-center"
              />
              <button 
                type="submit" 
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Continue to Chat
              </button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground/50 italic">
              Your key is only stored in memory and never sent to our servers.
            </p>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={prompt}
                  onInput={(e) => setPrompt(e.target.value)}
                  onKeyDown={onInpuCall}
                  placeholder="Ask me anything..."
                  ref={inputRef}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all shadow-inner"
                />
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={20} />
              </div>
              <button 
                onClick={fetchResult}
                disabled={loading || !prompt.trim()}
                className="px-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-2"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>

            <div className="relative group">
              <textarea
                ref={textAreaRef}
                placeholder="The AI's response will appear here..."
                readOnly
                className="w-full h-80 px-6 py-6 rounded-3xl bg-black/20 border border-white/5 outline-none resize-none text-foreground/90 leading-relaxed scrollbar-thin scrollbar-thumb-white/10 shadow-inner"
              ></textarea>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={CopyToClip}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all group/btn"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Loader loading={loading} />
    </div>
  );
}

export default ChatBot;
