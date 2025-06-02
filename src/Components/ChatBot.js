import { useState, useRef } from "react";
import Loader from "./Loader";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../Styles/ChatBot.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { dismiss } = toast;

function ChatBot() {
  const [apiKey, setApiKey] = useState("");
  const [isKeySubmitted, setIsKeySubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  // Generate response from Google GenAI using user-provided key
  const generateResponse = async (prompt) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const { response } = await genAI
        .getGenerativeModel({ model: "gemini-1.5-flash" })
        .generateContent(prompt);
      return response.text();
    } catch (error) {
      console.error(error);
      dismiss();
      toast.error("Some error occurred while fetching response.", {
        theme: "dark",
      });
      return "";
    }
  };

  const toggleLoader = () => {
    setLoading((prev) => !prev);
  };

  const onInpuCall = (e) => {
    const { key } = e;
    setPrompt(e.target.value);
    if (key === "Enter") fetchResult();
  };

  const fetchResult = async () => {
    if (!prompt) {
      dismiss();
      toast.info("Please enter something", {
        theme: "dark",
        transition: Zoom,
      });
      inputRef.current.focus();
    } else {
      toggleLoader();
      const result = await generateResponse(prompt);
      toggleLoader();
      textAreaRef.current.value = result;
    }
  };

  const CopyToClip = () => {
    const response = textAreaRef.current.value;
    if (response) {
      navigator.clipboard.writeText(response);
      dismiss();
      toast.success("Text copied to clipboard", {
        theme: "dark",
        transition: Zoom,
      });
    } else {
      dismiss();
      toast.info("Nothing to copy", {
        theme: "dark",
      });
    }
  };

  const handleKeySubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error("API Key is required", { theme: "dark" });
      return;
    }
    setIsKeySubmitted(true);
  };

  return (
    <div className="chatbot-container">
      <h2>ChatBot</h2>

      {!isKeySubmitted ? (
        <form onSubmit={handleKeySubmit}>
          <input
            type="text"
            placeholder="Enter Google GenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Set API Key
          </button>
        </form>
      ) : (
        <>
          <input
            type="text"
            onInput={(e) => onInpuCall(e)}
            placeholder="Enter your prompt"
            ref={inputRef}
            onKeyDown={onInpuCall}
          />
          <button onClick={() => fetchResult()}>Search</button>

          <textarea
            ref={textAreaRef}
            placeholder="Your Result will be shown here ..."
            readOnly
          ></textarea>

          <button onClick={() => CopyToClip()}>Copy Text</button>
        </>
      )}

      <Loader loading={loading} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Zoom}
      />
    </div>
  );
}

export default ChatBot;
