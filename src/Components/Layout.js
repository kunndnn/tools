import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import { Links } from "../helpers/constants";
const NavLinks = Links.map(({ list, name }) => {
  return (
    <li key={list}>
      <Link to={list}>{name}</Link>
    </li>
  );
});
function Layout() {
  return (
    <>
      <nav>
        <ul>{NavLinks}</ul>
      </nav>
      <Outlet />
      <Footer /> {/* to show footer in all the pages */}
    </>
  );
}

export default Layout;
