// ./Components/Home.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Links } from "../helpers/constants";
import { ThemeContext } from "./Common/ThemeContext";

export default function Home() {
  const tools = Links;
  const { theme } = useContext(ThemeContext);
  const isHalloween = theme === "dark";

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto relative">
      <header className="mb-20 text-center py-4 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-6 flex items-center justify-center gap-6">
          <span className="animate-float">
            {isHalloween ? "🎃" : "🛠️"}
          </span>
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
            Utility Tools Hub
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground opacity-80 max-w-2xl mx-auto font-medium">
          {isHalloween ? "Spooky powerful tools for your digital survival 🦇" : "A collection of simple but powerful online tools for everyone 🌦️"}
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {tools.map((tool, index) => (
          <Link 
            key={index} 
            to={tool.path} 
            className="group glass p-8 rounded-[2rem] hover:scale-[1.05] transition-all duration-500 hover:border-primary/50 relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{tool.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
