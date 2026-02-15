// ./Components/Home.jsx
import { Link } from "react-router-dom";
import { Links } from "../helpers/constants";

export default function Home() {
  const tools = Links;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-4">
          🛠️ 
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Utility Tools Hub
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground opacity-80 max-w-2xl mx-auto">
          A collection of simple but powerful online tools —  
          everything from generating QR codes to checking the weather 🌦️.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <Link 
            key={index} 
            to={tool.path} 
            className="group glass p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:border-primary/50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{tool.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
