import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useState, useContext } from "react";
import { ThemeContext } from "./Common/ThemeContext";
import { ToggleTheme } from "./Common/ToggleTheme";
import { Github, Code2, Rocket, ArrowLeft, Ghost, Skull, Zap } from "lucide-react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isHalloween = theme === "dark";

  const urls = [
    { href: "https://github.com/kunndnn", icon: Github, label: "GitHub" },
    {
      href: "https://github.com/kunndnn/tools",
      icon: Code2,
      label: "Code",
    },
    {
      href: "https://kunndnn.github.io/portfolio",
      icon: Rocket,
      label: "Portfolio",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500 relative overflow-hidden">
      {/* Global Halloween Spooky Background */}
      {isHalloween && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[15%] left-[5%] text-primary/10 animate-float">
            <Ghost size={80} />
          </div>
          <div className="absolute top-[25%] right-[10%] text-secondary/10 animate-float [animation-delay:2s]">
            <Skull size={60} />
          </div>
          <div className="absolute bottom-[20%] left-[15%] text-accent/10 animate-float [animation-delay:1s]">
            <Ghost size={40} />
          </div>
          <div className="absolute bottom-[15%] right-[20%] text-primary/10 animate-float [animation-delay:3.5s]">
            <Skull size={50} />
          </div>
          <div className="absolute top-[60%] left-[45%] text-secondary/5 animate-float [animation-delay:2.5s]">
            <Zap size={100} className="rotate-12" />
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            ToolsHub
          </Link>
          {location.pathname !== "/" && (
            <button 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition-colors text-sm font-medium"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            {urls.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="p-2 rounded-full hover:bg-glass-bg transition-colors text-muted-foreground hover:text-primary"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <ToggleTheme />
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
