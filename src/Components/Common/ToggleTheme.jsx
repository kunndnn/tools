import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-white/5 border border-white/10 p-1 flex items-center transition-all duration-300 hover:border-primary/50 group overflow-hidden cursor-pointer"
      aria-label="Toggle Theme"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-500 z-10 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}
      >
        {theme === 'dark' ? (
          <Moon size={12} className="text-slate-900" />
        ) : (
          <Sun size={12} className="text-amber-500" />
        )}
      </div>
    </button>
  );
};
