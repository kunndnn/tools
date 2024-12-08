import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import "../../Styles/ToggleTheme.css";
import SunIcon from "../../assets/icons/sun.svg"; // Add the sun icon image
import MoonIcon from "../../assets/icons/moon.svg"; // Add the moon icon image

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <div
        className={`theme-toggle-button ${theme === "dark" ? "active" : ""}`}
        onClick={toggleTheme}
      >
        <img src={SunIcon} alt="Sun" className="sun-icon" />
        <img src={MoonIcon} alt="Moon" className="moon-icon" />
      </div>
    </div>
  );
};
