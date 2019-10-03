import React from "react";
import { Link } from "react-router-dom";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top nav"
      id="mainNav"
      style={{ height: 56 }}
    >
      <Link className="navbar-brand nav change_font4" to="/welcome">
        Chatr2.0
      </Link>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <SideNav />
        <AuthButton />
      </div>
    </nav>
  );
};

export default NavBar;
