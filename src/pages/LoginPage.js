import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/components/Login.css';
import screenshot from '../assests/images/screenshot.png';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div id="login--page--container">
      <div id="left--column--login">
        <div id="left-column-content">
          <h1 id="headline">A place for Forigners to</h1>
          <p id="subheadline">
            Share ideas - Ask Questions - Have Discussions - Write Articles
          </p>
          <img alt="img-description" id="screenshot" src={screenshot} />
          <p>
            <small className="login--summary">
              A community forum. For the community, by @samuelwondimu
            </small>
          </p>
        </div>
      </div>
      <div id="right--column--login">
        <div id="form-wrapper">
          <h1 id="title">𝖎𝖓𝖈𝖍𝖎𝖓𝖆</h1>
          <form onSubmit={onSubmit} className="form">
            <div className="form__field">
              <label htmlFor="formInput#email">Email: </label>
              <input
                className="input input--email"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form__field">
              <label htmlFor="formInput#password">Password: </label>
              <input
                className="input input--password"
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />
            </div>
            <input
              className="submit btn btn--main"
              type="submit"
              className="btn"
              value="Login"
            />
          </form>
          <div id="bottom-content">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
