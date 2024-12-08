// src/components/PasswordGenerator.jsx
import { useState } from "react";
import "../Styles/PasswordGenerator.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { dismiss } = toast;

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+{}[]|:;<>,.?/~";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    dismiss(); // Dismiss any existing toast notifications
    if (!password) return toast.error("Nothing to copy", { theme: "dark" });
    navigator.clipboard.writeText(password);
    toast.success("Password copied !!!", { theme: "dark" });
  };

  return (
    <>
      <div className="container">
        <div className="password-generator">
          <h2>Password Generator</h2>
          <div className="password-display">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Your secure password"
            />
            <button onClick={copyToClipboard}>Copy</button>
          </div>

          <div className="controls">
            <div className="control">
              <label>Password Length: {length}</label>
              <input
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>

            <div className="control">
              <label>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Include Uppercase
              </label>
            </div>

            <div className="control">
              <label>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Include Lowercase
              </label>
            </div>

            <div className="control">
              <label>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers
              </label>
            </div>

            <div className="control">
              <label>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>
            </div>
          </div>

          <button className="generate-button" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
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
}
