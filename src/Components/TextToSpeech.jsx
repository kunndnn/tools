import React, { useState, useEffect } from "react";
import { Volume2, Play, CircleStop, Waves, Languages } from "lucide-react";

const TextToSpeech = () => {
  const [textToRead, setTextToRead] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;

      const populateVoices = () => {
        const availableVoices = synthesis.getVoices();
        setVoices(availableVoices);
        if (availableVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(availableVoices[0].name + " (" + availableVoices[0].lang + ")");
        }
      };

      populateVoices();
      synthesis.onvoiceschanged = populateVoices;

      return () => {
        synthesis.onvoiceschanged = null;
        synthesis.cancel();
      };
    }
  }, []);

  const handleSpeak = () => {
    if ("speechSynthesis" in window && textToRead) {
      const synthesis = window.speechSynthesis;
      synthesis.cancel(); // Stop any current speech

      const utterance = new SpeechSynthesisUtterance(textToRead);
      const selectedVoiceObj = voices.find(
        (voice) => voice.name + " (" + voice.lang + ")" === selectedVoice
      );
      
      if (selectedVoiceObj) {
        utterance.voice = selectedVoiceObj;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Volume2 size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Text to Speech</h2>
              <p className="text-muted-foreground text-sm">Convert text into natural sounding voice</p>
            </div>
          </div>
          
          {isSpeaking && (
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent/20">
              <Waves size={14} className="animate-pulse" />
              Speaking
            </div>
          )}
        </div>

        <div className="space-y-6">
          <textarea
            value={textToRead}
            onChange={(e) => setTextToRead(e.target.value)}
            placeholder="Type or paste something to read aloud..."
            className="w-full min-h-[200px] p-6 rounded-2xl bg-black/20 border border-white/10 focus:border-primary/50 outline-none transition-all resize-none leading-relaxed shadow-inner"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <Languages size={12} /> Select Voice
              </label>
              <select
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none appearance-none cursor-pointer transition-all text-sm font-medium"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                {voices.map((voice) => (
                  <option key={voice.name + voice.lang} value={`${voice.name} (${voice.lang})`} className="bg-slate-900">
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button 
                onClick={handleSpeak}
                disabled={!textToRead || isSpeaking}
                className="flex-grow sm:flex-initial px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale active:scale-95"
              >
                <Play size={18} fill="currentColor" />
                Play
              </button>
              <button 
                onClick={handleStop}
                className="p-3.5 bg-white/5 border border-white/10 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all active:scale-95"
                title="Stop"
              >
                <CircleStop size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-40">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Browser Native</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Privacy First</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Multi-Language</span>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
