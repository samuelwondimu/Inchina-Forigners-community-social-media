import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import '../../styles/components/HeaderBar.css';
import Avatar from '../common/Avatar';
import { getCurrentProfile } from '../../actions/profile';
import Logo from '../../img/inchina-logo.png';

const Navbar = ({
  auth: { isAuthenticated },
  logout,
  getCurrentProfile,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const authLinks = (
    <ul>
      <li>
        <Link to="/search">
          <i class="fas fa-search"></i> Search
        </Link>
      </li>
      <li>
        <Link to="/profiles">community</Link>
      </li>
      <li>
        <Link to="/posts">posts</Link>
      </li>
      <li className="hide-sm">
        <Link to="/dashboard">my profile</Link>
      </li>
      <li className="hide-sm">
        <a onClick={logout} href="#!">
          logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/search">
          <i class="fas fa-search"></i> Search
        </Link>
      </li>
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
    <div id="header">
      <div id="logo">
        <Link to={'/'}>
          <h2>𝖎𝖓𝖈𝖍𝖎𝖓𝖆</h2>
        </Link>
      </div>
      <div id="nav-wrapper">{isAuthenticated ? authLinks : guestLinks}</div>
    </div>
  );
};

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(Navbar);
