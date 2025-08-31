// ./Components/Home.jsx
import { Link } from "react-router-dom";
import "../Styles/Home.css"; // create a new css file for styling
import { Links } from "../helpers/constants";

export default function Home() {
 const tools = Links;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🛠️ Utility Tools Hub</h1>
        <p>
          A collection of simple but powerful online tools —  
          everything from generating QR codes to checking the weather 🌦️.
        </p>
      </header>

      <section className="tools-grid">
        {tools.map((tool, index) => (
          <Link key={index} to={tool.path} className="tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
