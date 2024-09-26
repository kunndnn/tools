import { useState, useRef } from "react";
import Loader from "./Loader";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../Styles/ChatBot.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { REACT_APP_API_KEY: API_KEY } = process.env; // api key

// generate the response from generative AI
const generateResponse = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    //   const prompt = "who is harry potter.";
    const { response } = await genAI
      .getGenerativeModel({ model: "gemini-1.5-flash" })
      .generateContent(prompt);
    const text = response.text();
    return text;
  } catch (error) {
    toast.error(`Some Error occured !!!`, {
      theme: "dark",
    });
    return "";
  }
};

function ChatBot() {
  const [loading, setLoading] = useState(false); // State management here
  const [prompt, setPrompt] = useState("");
  const textAreaRef = useRef(null);
  const inputRef = useRef(null);

  //on input
  function onInpuCall(e) {
    const { key } = e;
    setPrompt(e.target.value);
    if (key === "Enter") fetchResult();
  }

  // toggle loader
  function toggleLoader() {
    setLoading((prevLoading) => !prevLoading); // Toggle the loading state
  }

  // fetch & set result from AI
  const fetchResult = async () => {
    if (!prompt) {
      toast.info("Please enter something", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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

  //   copy to clipboard
  const CopyToClip = () => {
    const response = textAreaRef.current.value;

    if (response) {
      navigator.clipboard.writeText(response);
      toast.success("Text copied to clipboard", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    } else {
      toast.info(`Nothing to copy`, {
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="chatbot-container">
        <h2>ChatBot</h2>
        <input
          type="text"
          onInput={(e) => onInpuCall(e)}
          placeholder="Enter your prompt"
          ref={inputRef}
          onKeyDown={onInpuCall}
        />
        <button onClick={() => fetchResult()}>Search </button>
        <textarea
          ref={textAreaRef}
          placeholder="Your Result will be shown here ..."
          readOnly
        ></textarea>
        <button onClick={() => CopyToClip()}>Copy Text</button>
        <Loader loading={loading} /> {/* Pass loading state to Loader */}
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
      </div>
    </>
  );
}

export default ChatBot;
