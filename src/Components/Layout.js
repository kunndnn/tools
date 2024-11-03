import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/loader">Loader</Link>
          </li> */}
          <li>
            <Link to="/file-to-buffer">File to Buffer</Link>
          </li>
          <li>
            <Link to="/bar-code">Bar code generator</Link>
          </li>
          <li>
            <Link to="/qr-code">QR code generator</Link>
          </li>
          <li>
            <Link to="/text-to-speech">Text to speech</Link>
          </li>
          <li>
            <Link to="/live-camera">Live Camera</Link>
          </li>
          <li>
            <Link to="/drop-zone">Drop Zone</Link>
          </li>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
          {/* <li>
            <Link to="/chat-bot">Chat Bot</Link>
          </li> */}
        </ul>
      </nav>
      <Outlet />
      <Footer /> {/* to show footer in all the pages */}
    </>
  );
}

export default Layout;
