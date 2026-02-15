import { useState } from "react";
import { Sparkles, Download, Key, Send, Loader2, Wand2 } from "lucide-react";

const TextToImage = () => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();
    if (!apiKey || !prompt) return;

    setLoading(true);
    setImageSrc("");
    setError("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              responseModalities: ["TEXT", "IMAGE"],
            },
          }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || "Failed to generate image");
      }

      const parts = json?.candidates?.[0]?.content?.parts || [];
      const imageData = parts.find((p) => p.inlineData?.data)?.inlineData?.data;

      if (imageData) {
        setImageSrc(`data:image/png;base64,${imageData}`);
      } else {
        throw new Error("No image data received from API");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "generated-ai-art.png";
    link.click();
  };

  const onKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Wand2 size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Art Generator</h2>
            <p className="text-muted-foreground text-sm">Transform your imagination into visuals using Gemini AI</p>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-6 max-w-lg mx-auto py-12 text-center">
            <div className="p-4 bg-white/5 rounded-full w-fit mx-auto mb-4 border border-white/10">
              <Key size={32} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Configure API Access</h3>
              <p className="text-sm text-muted-foreground">To use the image generator, please enter your Google Gemini API key.</p>
            </div>
            <form onSubmit={onKeySubmit} className="space-y-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                required
                className="w-full px-6 py-4 rounded-2xl bg-black/20 border border-white/10 focus:border-primary/50 outline-none transition-all text-center tracking-widest"
              />
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
              >
                Get Started
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm text-center font-medium animate-in slide-in-from-top-2">
                  ⚠️ {error}
                </div>
              )}
            <form onSubmit={generateImage} className="relative group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to see (e.g., 'A futuristic city at sunset in cyberpunk style')"
                required
                rows="4"
                className="w-full p-6 pb-20 rounded-3xl bg-black/20 border border-white/10 focus:border-primary/50 outline-none transition-all resize-none font-medium leading-relaxed shadow-inner"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-2">
                  <Sparkles size={12} /> Powered by Gemini 2.0
                </div>
                <button
                  type="submit"
                  disabled={loading || !prompt}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:grayscale"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {loading ? "Creating..." : "Generate"}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 gap-8 pt-4">
              {loading && (
                <div className="aspect-square max-w-lg mx-auto w-full rounded-3xl overflow-hidden glass border border-white/10 flex flex-col items-center justify-center gap-6 animate-pulse">
                  <div className="relative">
                    <Loader2 size={64} className="text-primary animate-spin" />
                    <Sparkles size={24} className="absolute -top-2 -right-2 text-secondary animate-bounce" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-bold">Weaving your imagination...</p>
                    <p className="text-xs text-muted-foreground font-mono">GEMINI_AI_RENDERING_ENGINE_ACTIVE</p>
                  </div>
                </div>
              )}

              {imageSrc && !loading && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="relative aspect-square max-w-lg mx-auto rounded-[2.5rem] overflow-hidden group shadow-2xl ring-1 ring-white/10">
                    <img
                      src={imageSrc}
                      alt="Generated AI Art"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-8">
                      <div className="text-white">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70">AI Generated</p>
                        <p className="text-sm font-medium line-clamp-1">{prompt}</p>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all active:scale-95"
                        title="Download"
                      >
                        <Download size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToImage;
