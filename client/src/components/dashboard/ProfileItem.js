import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DashboardActions from './DashboardActions';
import { deleteAccount } from '../../actions/profile';

const ProfileItem = ({
  profile: {
    company,
    website,
    location,
    bio,
    status,
    social,
    skills,
    user: { avatar, name }
  },
  deleteAccount
}) => {
  return (
    <Fragment>
      <div class="float-container">
        <div class="float-child">
          <div class="green text-center">
            <div className="profile-top">
              <div>
                <img className="round-img my-1" src={avatar} />
                <h1 className="large">{name}</h1>
                <p className="lead">
                  {status} at <span>{company}</span>
                </p>
                <p>
                  <span>{location}</span>
                </p>
                <div className="icons my-1">
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe fa-2x" />
                  </a>
                  {social
                    ? Object.entries(social)
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
            </div>
          </div>
        </div>
        <div class="float-child text-center">
          <div class="blue">
            <div className="profile-about p-2">
              <Fragment>
                <DashboardActions />
                <h2>{name.trim().split(' ')[0]}'s Bio</h2>
                <p>{bio}</p>
                <hr></hr>
                <h2>Skill Set</h2>
                <div className="skills">
                  {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                      <i className="fas fa-check" /> {skill}
                    </div>
                  ))}
                </div>
                <p>you have not yet setup a profile, please add some info</p>
              </Fragment>
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
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
