import { useState, useRef } from "react";
import { Mic, MicOff, Copy, Check, Trash2, AudioLines } from "lucide-react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser 😢");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(prev => prev + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const copyToClipboard = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Mic size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Speech to Text</h2>
              <p className="text-muted-foreground text-sm">Transcribe your voice in real-time</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isListening && (
              <div className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/20 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Listening
              </div>
            )}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-4 rounded-2xl transition-all shadow-lg active:scale-95 ${isListening
                  ? "bg-red-500 text-white shadow-red-500/20 hover:bg-red-600"
                  : "bg-primary text-white shadow-primary/20 hover:opacity-90"
                }`}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {isListening && <AudioLines className="text-primary animate-pulse" size={20} />}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Click the microphone to start transcribing..."
            className="w-full min-h-[300px] p-8 pt-12 rounded-3xl bg-black/20 border border-white/10 focus:border-primary/50 outline-none transition-all resize-none font-medium leading-relaxed shadow-inner scrollbar-thin scrollbar-thumb-white/10"
          />

          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <button
              onClick={() => setText("")}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all text-muted-foreground"
              title="Clear"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-muted-foreground hover:text-white"
              title="Copy"
            >
              {copied ? <Check size={20} className="text-accent" /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-12 text-muted-foreground/40 font-bold uppercase tracking-[0.2em] text-[10px]">
          <span>AI Powered</span>
          <span>•</span>
          <span>Real-time Sync</span>
          <span>•</span>
          <span>Secure</span>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
