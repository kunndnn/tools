import { Outlet, Link } from "react-router-dom";
function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/loader">Loader</Link>
          </li>
          <li>
            <Link to="/file-to-buffer">File to Buffer</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
