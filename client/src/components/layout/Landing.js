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
            <span>Forigners Community Social Media</span>
          </h2>
          <p>
            Where you can share/exchnage information, idea, career interst...and
            so much more with foriegners living in china.
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
