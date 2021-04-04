import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "../../styles/components/HeaderBar.css";
import Avatar from "../common/Avatar";

const Navbar = ({ auth: { isAuthenticated }, logout, getCurrentProfile }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const authLinks = (
    <ul className={click ? "nav-options active" : "nav-options"}>
      <li className="option" onClick={closeMobileMenu}>
        <Link to="/search">
          <i class="fas fa-search"></i> Search
        </Link>
      </li>
      <li className="option" onClick={closeMobileMenu}>
        <Link to="/profiles">community</Link>
      </li>
      <li className="option" onClick={closeMobileMenu}>
        <Link to="/posts">posts</Link>
      </li>
      <li className="hide-sm option" onClick={closeMobileMenu}>
        <Link to="/dashboard">my profile</Link>
      </li>
      <li className="hide-sm option" onClick={closeMobileMenu}>
        <a onClick={logout} href="#!">
          logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className={click ? "nav-options active" : "nav-options"}>
      <li className="option" onClick={closeMobileMenu}>
        <Link to="/search">
          <i class="fas fa-search"></i> Search
        </Link>
      </li>
      <li className="option" onClick={closeMobileMenu}>
        <Link to="/profiles">Community</Link>
      </li>
      <li className="option" onClick={closeMobileMenu}>
        <Link to="/register">register</Link>
      </li>
      <li className="option" onClick={closeMobileMenu}>
        <Link to="/login">login</Link>
      </li>
    </ul>
  );

  return (
    <div id="header">
      <div id="logo">
        <Link to={"/"}>
          <h2>𝖎𝖓𝖈𝖍𝖎𝖓𝖆</h2>
        </Link>
      </div>
      <div>
        <div id="nav-wrapper">{isAuthenticated ? authLinks : guestLinks}</div>
        <div className="mobile-menu nav-wrapper" onClick={handleClick}>
          {click ? (
            <i class="fas fa-times fa-2x"></i>
          ) : (
            <i class="fas fa-bars fa-2x"></i>
          )}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
