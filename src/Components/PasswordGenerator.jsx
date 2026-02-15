import { useState, useEffect } from "react";
import { Lock, Copy, Check, RefreshCw, ShieldCheck, ShieldAlert } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+{}[]|:;<>,.?/~";

    if (!charset) {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length > 12) score++;
    if (length > 20) score++;
    if (includeUppercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    
    if (score < 3) return { label: "Weak", color: "text-red-500", icon: <ShieldAlert size={14} /> };
    if (score < 5) return { label: "Medium", color: "text-amber-500", icon: <ShieldCheck size={14} /> };
    return { label: "Strong", color: "text-accent", icon: <ShieldCheck size={14} /> };
  };

  const strength = getStrength();

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Lock size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Password Generator</h2>
            <p className="text-muted-foreground text-sm">Create secure, random passwords</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Generating..."
              className="w-full px-6 py-5 rounded-2xl bg-black/20 border border-white/10 text-xl font-mono text-center tracking-wider outline-none shadow-inner group-hover:border-primary/30 transition-all selection:bg-primary/20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <button 
                onClick={generatePassword}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all active:rotate-180 duration-500"
                title="Regenerate"
              >
                <RefreshCw size={18} />
              </button>
              <button 
                onClick={copyToClipboard}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
                title="Copy"
              >
                {copied ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${strength.color}`}>
              {strength.icon}
              {strength.label} Security
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              Entropy: {Math.floor(length * 5.2)} bits
            </div>
          </div>

          <div className="space-y-4 p-6 bg-white/5 rounded-2xl border border-white/5">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Length</span>
                <span className="text-primary font-bold">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: "Uppercase", state: includeUppercase, setter: setIncludeUppercase },
                { label: "Lowercase", state: includeLowercase, setter: setIncludeLowercase },
                { label: "Numbers", state: includeNumbers, setter: setIncludeNumbers },
                { label: "Symbols", state: includeSymbols, setter: setIncludeSymbols },
              ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/20 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={opt.state}
                    onChange={(e) => opt.setter(e.target.checked)}
                    className="w-4 h-4 rounded border-white/10 bg-black/20 text-primary focus:ring-primary/20 focus:ring-offset-0"
                  />
                  <span className="text-sm font-medium text-foreground/80">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button 
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            onClick={generatePassword}
          >
            Regenerate Password
          </button>
        </div>
      </div>
    </div>
  );
}
