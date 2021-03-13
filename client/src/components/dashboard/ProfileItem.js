import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';

const ProfileItem = ({
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
            <div className="profile-top">
              <img className="round-img my-1" src={user.avatar} />
              <h1 className="large">{user.name}</h1>
              {profile ? (
                <div>
                  <p className="lead">
                    {profile.status} at <span>{profile.company}</span>
                  </p>
                  <p>
                    <span>{profile.location}</span>
                  </p>
                  <div className="icons my-1">
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-globe fa-2x" />
                    </a>
                    {profile.social
                      ? Object.entries(profile.social)
                          .filter(([_, value]) => value)
                          .map(([key, value]) => (
                            <a
                              key={key}
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className={`fab fa-${key} fa-2x`}></i>
                            </a>
                          ))
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div class="float-child text-center">
          <div class="blue">
            <div className="profile-about p-2">
              {profile !== null ? (
                <Fragment>
                  <DashboardActions />
                  <h2>{user.name.trim().split(' ')[0]}'s Bio</h2>
                  <p>{profile.bio}</p>
                  <hr></hr>
                  <h2>Skill Set</h2>
                  <div className="skills">
                    {profile.skills.map((skill, index) => (
                      <div key={index} className="p-1">
                        <i className="fas fa-check" /> {skill}
                      </div>
                    ))}
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <p>you have not yet setup a profile, please add some info</p>
                  <Link to="/create-profile" className="btn my-1">
                    Create Profile
                  </Link>
                </Fragment>
              )}
              <button
                style={{
                  padding: '9px',
                  marginLeft: '20px',
                  marginBottom: '20px'
                }}
                className="btn btn-danger my-1"
                onClick={() => deleteAccount()}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
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
  ProfileItem
);
