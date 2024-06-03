import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/products" >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/aboutus">
              About US
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
