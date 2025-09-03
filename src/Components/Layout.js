import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { Links } from "../helpers/constants";
import "../Styles/Nav.css";
import { useState } from "react";
import { ToggleTheme } from "./Common/ToggleTheme";
import { Github, Code2, Rocket } from "lucide-react";
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  // const toggleNavbar = () => {
  //   setIsOpen(!isOpen);
  // };

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
    <>
      <nav className={`navbar ${isOpen ? "open" : ""}`}>
        {/* <div className="navbar-header">
          <button className="navbar-toggle" onClick={toggleNavbar}>
            {isOpen ? "Close" : "Menu"}
          </button>
        </div> */}
        {/* <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          {Links.map(({ list, name }) => (
            <li key={list}>
              <Link to={list} onClick={() => setIsOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
        </ul> */}
        <div className="nav-actions">
          <ToggleTheme />
          <div style={{ margin: 0, padding: 0 }}>
            {location.pathname === "/" ? (
              ""
            ) : (
              <button className="back-btn" onClick={() => navigate(-1)}>
                ⬅ Back
              </button>
            )}
            {urls.map(({ href, icon: Icon, label, title }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="github"
                title={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
