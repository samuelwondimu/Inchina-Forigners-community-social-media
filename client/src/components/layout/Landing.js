import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingImage from '../../img/landingimage.png';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="landing_section">
      <div className="content">
        <div className="textBox">
          <h2>
            Welcome to InChina
            <br />
            <span>Forigners Community blog post</span>
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            consectetur, quia, natus vitae velit odio laborum dicta quisquam
            minima sunt dolor quod voluptate, iure sed maiores animi unde.
            Repellat, eum!
          </p>
          <Link className="btn" to="/login">
            LOG IN
          </Link>
          <Link className="btn" to="/register">
            SIGN UP
          </Link>
        </div>
        <div className="imgBox">
          <img className="imgBox" src={LandingImage} alt="" />
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
