import React, { useState } from "react";

const TextToImage = () => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageSrc("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
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
      const parts = json?.candidates?.[0]?.content?.parts || [];
      const imageData = parts.find((p) => p.inlineData?.data)?.inlineData?.data;

      if (imageData) {
        setImageSrc(`data:image/png;base64,${imageData}`);
      } else {
        alert("Image generation failed or no image returned.");
        console.error(json);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageSrc) return;

    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {!submitted ? (
        <form onSubmit={() => setSubmitted(true)}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter Google GenAI API Key"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "4px",
              border: "1px solid #999",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </form>
      ) : (
        <form onSubmit={generateImage}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your image prompt..."
            required
            rows="5"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #999",
              marginBottom: "16px",
            }}
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: loading ? "#ccc" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </form>
      )}

      {imageSrc && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h3>Generated Image:</h3>
          <img
            src={imageSrc}
            alt="Generated"
            style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
          <div style={{ marginTop: "15px" }}>
            <button
              onClick={handleDownload}
              style={{
                padding: "10px 20px",
                background: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Download Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToImage;
