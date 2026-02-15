import { useState } from "react";
import { Mail, Server, Shield, Send, Key, Hash } from "lucide-react";

const SMTP = () => {
  const [formData, setFormData] = useState({
    host: "",
    port: "587",
    username: "",
    password: "",
    encryption: "tls"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Testing SMTP connection...", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Mail size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">SMTP Tester</h2>
            <p className="text-muted-foreground text-sm">Configure and test your email server settings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2">
                <Server size={14} /> Server Host
              </label>
              <input
                name="host"
                type="text"
                value={formData.host}
                onChange={handleChange}
                placeholder="smtp.example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2">
                <Hash size={14} /> Port
              </label>
              <input
                name="port"
                type="text"
                value={formData.port}
                onChange={handleChange}
                placeholder="587"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2">
                <Shield size={14} /> Encryption
              </label>
              <select
                name="encryption"
                value={formData.encryption}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 focus:border-primary/50 outline-none transition-all shadow-inner appearance-none"
              >
                <option value="none" className="bg-slate-900">None</option>
                <option value="tls" className="bg-slate-900">TLS</option>
                <option value="ssl" className="bg-slate-900">SSL</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2">
                <Key size={14} /> Username
              </label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="user@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2">
              <Key size={14} /> Password / API Key
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all shadow-inner"
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button 
              type="submit"
              className="flex-grow py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
            >
              <Send size={20} />
              Test Connection
            </button>
            <button 
              type="button"
              className="px-8 py-4 bg-white/5 border border-white/10 text-muted-foreground font-semibold rounded-xl hover:bg-white/10 transition-all"
              onClick={() => setFormData({ host: "", port: "587", username: "", password: "", encryption: "tls" })}
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Connection Log
          </h3>
          <div className="font-mono text-[10px] space-y-1 text-muted-foreground">
            <p className="text-accent/60">&gt; System initialized. Waiting for configuration...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMTP;
