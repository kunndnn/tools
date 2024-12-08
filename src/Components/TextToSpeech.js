import React, { useState, useEffect } from "react";
import "../Styles/TextToSpeech.css"; // Importing the external CSS file
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextToSpeech = () => {
  const [textToRead, setTextToRead] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const { dismiss } = toast;

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;

      const populateVoices = () => {
        const availableVoices = synthesis.getVoices();
        setVoices(availableVoices);
      };

      populateVoices(); // Populate voices when the component mounts

      synthesis.onvoiceschanged = () => {
        populateVoices(); // Update voices if they change
      };

      return () => {
        synthesis.onvoiceschanged = null; // Clean up
      };
    } else {
      toast.error("Your browser does not support speech synthesis", {
        theme: "dark",
      });
    }
  }, []);

  const handleSpeak = () => {
    dismiss(); // Dismiss any existing toast notifications
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);

      // Find the selected voice and set it to the utterance
      const selectedVoiceObj = voices.find(
        (voice) => voice.name + " (" + voice.lang + ")" === selectedVoice
      );
      if (selectedVoiceObj) {
        utterance.voice = selectedVoiceObj;
      }

      synthesis.speak(utterance);
      toast.success("Listen 👂🔊!!!", { theme: "dark" });
    }
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  return (
    <>
      <div className="container">
        <textarea
          className="textarea"
          value={textToRead}
          onChange={(e) => setTextToRead(e.target.value)}
          placeholder="Enter text here..."
          rows="4"
          cols="50"
        />
        <select
          className="select"
          value={selectedVoice}
          onChange={handleVoiceChange}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={`${voice.name} (${voice.lang})`}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
        <button className="button" onClick={handleSpeak}>
          Speak
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
};

export default TextToSpeech;
