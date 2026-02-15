import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
import { ToggleTheme } from "./Common/ToggleTheme";
import { Github, Code2, Rocket, ArrowLeft } from "lucide-react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            ToolsHub
          </Link>
          {location.pathname !== "/" && (
            <button 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/10"
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
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-muted-foreground hover:text-primary"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <ToggleTheme />
        </div>
      </nav>

      <main className="flex-grow">
        <div className="animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
