import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button style={{ backgroundColor: "#0056b3",padding:"10px", color:'white' }} onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};
