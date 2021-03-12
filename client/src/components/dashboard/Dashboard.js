import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <div class="float-container">
        <div class="float-child">
          <div class="green text-center">
            <img
              src={user && user.avatar}
              style={{ width: '300px', borderRadius: '50%' }}
            />
            <h1>{user && user.name}</h1>
            <h3>{profile && profile.bio}</h3>
          </div>
        </div>

        <div class="float-child">
          <div class="blue">
            {profile !== null ? (
              <Fragment>
                <DashboardActions />
                <ul>
                  <li>
                    <i class="fas fa-briefcase" /> <span>work's at</span>{' '}
                    {profile.company}
                  </li>
                  <li>
                    <i class="fas fa-street-view"></i> <span>Lives in </span>{' '}
                    {profile.location}
                  </li>
                  <li>
                    <i class="far fa-smile"></i> <span>Skills</span>
                    {profile.skills.map((skill) => skill + ',')}
                  </li>
                  <li>
                    <i class="fas fa-link"></i>
                  </li>
                </ul>

                <button className="btn" onClick={() => deleteAccount()}>
                  Delete My Account
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <p>you have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  Create Profile
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
