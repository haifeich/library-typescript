import * as React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header>
      <a href="#main" className="skip-nav-link">
        Skip to main content
      </a>
      <h1>
        <Link to="/">ti&m Library</Link>
      </h1>
      <nav>
        <ul className="linkscontainer">
          <li>
            <Link to="/" aria-label="back to homepage">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add" aria-label="go to add-book page">
              Add
            </Link>
          </li>
        </ul>
      </nav>
      <div className="buttoncontainer">
        <button className="button">SIGN IN</button>
      </div>
    </header>
  );
};

export default Nav;