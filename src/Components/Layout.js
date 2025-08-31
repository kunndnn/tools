import { Outlet, Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Links } from "../helpers/constants";
import "../Styles/Nav.css";
import { useState } from "react";
import { ToggleTheme } from "./Common/ToggleTheme";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`navbar ${isOpen ? "open" : ""}`}>
        <div className="navbar-header">
          <button className="navbar-toggle" onClick={toggleNavbar}>
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
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
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
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
