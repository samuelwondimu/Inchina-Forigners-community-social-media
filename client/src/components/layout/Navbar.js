import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">community</Link>
      </li>
      <li>
        <Link to="/posts">posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <span className="hide-sm">my profile</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <span className="hide-sm">logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Community</Link>
      </li>
      <li>
        <Link to="/register">register</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">inChina Community</Link>
      </h1>
      <div class="search-bar">
        <form>
          <input type="text" placeholder="Search" />
          <button className="search-button">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
