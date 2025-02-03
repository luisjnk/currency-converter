import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> <h2>Uphold</h2> </Link>
      </div>
      <nav className="nav-links">
        <Link to="/personal">Personal</Link>
        <Link to="/business">Business</Link>
        <Link to="/partners">Partners</Link>
      </nav>
      <div className="login-button">
        <Link to="/login" className="btn">Log In</Link>
      </div>
    </header>
  );
};
