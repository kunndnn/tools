import React, { useState, useRef } from "react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Start speech recognition
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
      setText(transcript);
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

  // Stop speech recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🎙️ Speech to Text</h2>
      <p>
        Click start and begin speaking. Your speech will be transcribed below.
      </p>

      <div style={{ margin: "1rem 0" }}>
        {!isListening ? (
          <button
            onClick={startListening}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ▶ Start Listening
          </button>
        ) : (
          <button
            onClick={stopListening}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ⏹ Stop Listening
          </button>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your speech will appear here..."
        rows="8"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default SpeechToText;
